import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';
import c from './add.module.scss';
import { API } from '../../api';
import { Icons } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    название: '',
    дата: '',
    категория: '',
    сумма: ''
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [day, month, year] = formData.дата.split('.');
      const formattedDate = `${year}-${month}-${day}`;

      const dataToSend = {
        название: formData.название,
        дата: formattedDate,
        категория: formData.категория,
        сумма: parseInt(formData.сумма, 10)
      };

      const response = await API.postExpense(dataToSend);

      if (response.status === 201) {
        window.location.reload();
        Navigate('/expenses/')
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };


  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.close} onClick={() => Navigate('/expenses/')}>
          <img src={Icons.close} alt="close" />
        </div>
        <h3>Добавить расход</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Название"
              value={formData.название}
              onChange={(e) => handleChange('название', e.target.value)}
              required
            />
          </div>

          <div>
            <IMaskInput
              mask="00.00.0000"
              placeholder="Дата"
              value={formData.дата}
              onAccept={(value) => handleChange('дата', value)}
              required
            />
          </div>

          <div>
            <select
              value={formData.категория}
              onChange={(e) => handleChange('категория', e.target.value)}
              required
            >
              <option value="" disabled>Категория</option>
              <option value="закуп">Закуп</option>
              <option value="оплата за смену">Оплата за смену</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              placeholder="Сумма"
              value={formData.сумма}
              onChange={(e) => handleChange('сумма', e.target.value)}
              required
            />
          </div>

          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;