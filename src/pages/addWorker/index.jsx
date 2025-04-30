import React, { useState, useEffect } from 'react';
import axios from 'axios';
import c from './addWorker.module.scss';

const AddWorker = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    имя: '',
    фамилия: '',
    год_рождения: '',
    график_работы: '',
    телефон: '',
    жизни: 5,
    бонусы: 0,
    выполненные_задачи: 0,
    просроченные_задачи: 0,
    отработанные_часы: 0.0,
    зарплата: '0.00',
    премия: '0.00'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/register/', formData, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      alert('✅ Работник добавлен!');
      window.location.href = '/';
    } catch (err) {
      console.error('❌ Ошибка:', err.response?.data || err.message);
      alert('Ошибка при добавлении работника');
    }
  };

  return (
    <div className={c.addContainer}>
      <div className={c.card}>
        <h2>Добавить работника</h2>
        <form onSubmit={handleSubmit} className={c.form}>
          <input type="text" name="username" placeholder="Логин" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="text" name="имя" placeholder="Имя" onChange={handleChange} required />
          <input type="text" name="фамилия" placeholder="Фамилия" onChange={handleChange} required />
          <input type="text" name="должность" placeholder="Должность" onChange={handleChange} required />
          <input type="number" name="год_рождения" placeholder="Год рождения" onChange={handleChange} required />
          <input type="number" name="зарплата" placeholder="Зарплата" onChange={handleChange} required />
          <select name='тип_получения_зарплаты' onChange={handleChange} required>
            <option value="Фиксированное">Фиксированное</option>
            <option value="Дневное">Дневное</option>
          </select>
          <input type="time" name="график_работы" placeholder="График (например, 09:00)" onChange={handleChange} required />
          <input type="text" name="телефон" placeholder="Телефон" onChange={handleChange} required />
          <button type="submit" className={c.btn}>Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default AddWorker;