import React, { useEffect, useState } from 'react';
import { API } from '../../api';
import c from './attendance.module.scss';
import UserName from '../../components/username';


const Attendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.getAttendance();
        setAttendances(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Ошибка загрузки посещений:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = attendances;

    if (filterDate) {
      result = result.filter((item) => item.дата === filterDate);
    }

    if (timeStart) {
      result = result.filter((item) => item.время_прихода >= timeStart);
    }

    if (timeEnd) {
      result = result.filter((item) => item.время_прихода <= timeEnd);
    }

    setFiltered(result.reverse());
  }, [filterDate, timeStart, timeEnd, attendances]);

  return (
    <div className={c.attendance_wrapper}>
      <h2>Посещения</h2>

      <div className={c.filters}>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        <input type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
        <input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
      </div>

      {filtered.map((a) => (
        <div key={a.id} className={c.attendance_card}>
          <h3>Работник: <UserName id={a.работник}/></h3>
          <div className={c.info}>
            <p><span className="label">Дата:</span> {a.дата}</p>
            <p><span className="label">Приход:</span> {a.время_прихода}</p>
            <p><span className="label">Уход:</span> {a.время_ухода || '—'}</p>
            <p><span className="label">Опоздание:</span> {a.опоздание_в_минутах} минут</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attendance;
