import React, { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';
import c from './add.module.scss';
import { API } from '../../api';
import { Icons } from '../../assets/icons';

const AddTask = ({setActive}) => {
  const [ workers, setWorkers ] = useState(null)
  const [ executors, setExecutors ] = useState(null)

  useEffect(() => {
    API.getWorkers()
      .then(res => {
        console.log(res.data);
        const result = res.data.filter(item => item["должность"] !== 'Администратор')
        const executorsData = res.data.filter(item => item["должность"] === 'Администратор')
        setWorkers(result)
        setExecutors(executorsData)
      })
  }, [])

  const [formData, setFormData] = useState({
    название: '',
    дата: '',
    время: '',
    срок: '', // сюда будет собираться ISO строка
    приоритет: '',
    исполнитель: '',
    постановщик: '',
    оценка: 0,
    потраченное_время_в_минутах: 0.0,
    статус: 'в_ожидании',
    опоздание_по_задаче_в_минутах: 0
  });

  // Собираем ISO-дату из двух полей
  useEffect(() => {
    const { дата, время } = formData;
  
    // Проверяем: есть ли и дата, и время, и они полные
    if (
      /^\d{2}\.\d{2}\.\d{4}$/.test(дата) &&
      /^\d{2}:\d{2}$/.test(время)
    ) {
      const [day, month, year] = дата.split('.');
      const [hours, minutes] = время.split(':');
      const iso = new Date(Date.UTC(year, month - 1, day, hours, minutes)).toISOString();
      setFormData(prev => ({ ...prev, срок: iso }));
    }
  }, [formData.дата, formData.время]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📝 Финальный объект задачи:', formData);

    // Тут можно сделать POST запрос
    API.postTask(formData)  
      .then(res => {
        if(res.status === 201){
          window.location.reload()
        }
      })
  };
  
  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.close} onClick={() => setActive(false)}>
          <img src={Icons.close} alt="close" />
        </div>
        <h3>Добавить задачу</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Название"
              value={formData.название}
              onChange={(e) => handleChange('название', e.target.value)}
            />
          </div>

          <div>
            <IMaskInput
              mask="00.00.0000"
              placeholder="Срок дата"
              value={formData.дата}
              onAccept={(value) => handleChange('дата', value)}
            />
          </div>

          <div>
            <IMaskInput
              mask="00:00"
              placeholder="Срок время"
              value={formData.время}
              onAccept={(value) => handleChange('время', value)}
            />
          </div>

          <div>
            <select
              value={formData.приоритет}
              onChange={(e) => handleChange('приоритет', e.target.value)}
            >
              <option value="" disabled>Приоритет</option>
              <option value="низкий">Низкий</option>
              <option value="средний">Средний</option>
              <option value="высокий">Высокий</option>
            </select>
          </div>

          <div>
            <select
              value={formData.исполнитель}
              onChange={(e) => handleChange('исполнитель', e.target.value)}
            >
              <option value="" disabled>Исполнитель</option>
              {
                workers && workers.map(item => (
                  <option key={item.id} value={item.id}>
                    {`${item["имя"]} ${item["фамилия"]}`}
                  </option>
                ))
              }
            </select>
          </div>

          <div>
            <select
              value={formData.постановщик}
              onChange={(e) => handleChange('постановщик', e.target.value)}
            >
              <option value="" disabled>Постановщик</option>
              {
                
                executors && executors.map(item => (
                  <option key={item.id} value={item.id}>
                    {`${item["имя"]} ${item["фамилия"]}`}
                  </option>
                ))
              }
            </select>
          </div>

          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
