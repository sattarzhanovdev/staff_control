import React from 'react'
import c from './checkin.module.scss'
import { Icons } from '../../assets/icons'
import { Components } from '..'
import { API } from '../../api'

const CheckIn = () => {
  const [ active, setActive ] = React.useState(false)
  const [ type, setType ] = React.useState('')
  const [ lateTime, setLateTime ] = React.useState(0)
  const [ time, setTime ] = React.useState('')
  const [lateMinutes, setLateMinutes] = React.useState(0);
  const [ attendance, setAttendance ] = React.useState(false)

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')


  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
  
      // 🎯 разбор графика
      const [workHour, workMinute] = user["график_работы"].split(':').map(Number);
      const planned = new Date();
      planned.setHours(workHour);
      planned.setMinutes(workMinute);
      planned.setSeconds(0);
  
      const lateMs = now - planned;
      const isLate = lateMs > 0;
  
      if (isLate) {
        const minutes = Math.floor(lateMs / 60000);
        setLateMinutes(minutes);
      } else {
        setLateMinutes(0);
      }
    }, 1000); // проверка каждую минуту
  
    return () => clearInterval(interval);
  }, [user]);
  

  const workLat = 42.867051;
  const workLng = 74.589865;

  // const workLat = 40.53633557888629; 
  // const workLng = 72.8339069223278; 


  function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Радиус Земли в метрах
    const toRad = (x) => x * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Расстояние в метрах
  }

  const attendanceId = localStorage.getItem('attendanceId')
  const comeTime = localStorage.getItem('comeTime')


  async function handleCheckIn() {
    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const distance = getDistanceFromLatLonInMeters(latitude, longitude, workLat, workLng);
          const now = new Date();
  
          const [workHour, workMinute] = user["график_работы"].split(':').map(Number);
          const plannedTime = new Date(now);
          plannedTime.setHours(workHour, workMinute, 0, 0);
  
          const lateMs = now - plannedTime;
          const lateMinutes = lateMs > 0 ? Math.floor(lateMs / 60000) : 0;
  
          const formattedTime = now.toTimeString().slice(0, 8);
          const formattedDate = now.toISOString().split('T')[0];
  
          const isLeaving = Boolean(attendance); // если уже есть посещение — уход
  
          const data = {
            работник: user.id,
            дата: formattedDate,
            время_прихода: isLeaving ? comeTime : formattedTime,
            время_ухода: isLeaving ? formattedTime : undefined,
            опоздание_в_минутах: lateMinutes
          };
  
          if (distance > 50) {
            setType('workplace');
          } else {
            console.log("✅ Вы на рабочем месте. Расстояние:", distance.toFixed(1), "м");
  
            if (lateMinutes > 0) {
              setType('late');
              setLateTime(lateMinutes);
              setTime(formattedTime);
            }
          }
  
          if (!isLeaving) {
            await API.postAttendance(token, data).then(res => {
              localStorage.setItem('comeTime', res.data['время_прихода']);
              localStorage.setItem('attendanceId', res.data.id);
              setType('win');
            });
          } else {
            await API.putAttendance(attendanceId, data).then(res => {
              localStorage.removeItem('attendanceId');
              localStorage.removeItem('comeTime');
            })
            setType('leave');
          }
  
          setActive(true);
        },
        async (err) => {
          console.error("Ошибка геолокации:", err);
          alert("Геолокация не работает. Разрешите доступ.");
  
          try {
            const res = await navigator.permissions.query({ name: 'geolocation' });
            console.log("Статус геолокации:", res.state);
            if (res.state === 'denied') {
              alert('Вы ранее запретили геолокацию. Разрешите её вручную в настройках браузера.');
            }
          } catch (permErr) {
            console.error("Ошибка запроса разрешений:", permErr);
          }
        }
      );
    } catch (e) {
      console.error('❌ Ошибка отправки посещения:', e.response?.data || e.message);
      alert('Ошибка при отметке прихода.');
    }
  }
  
  
  React.useEffect(() => {
    API.getAttendance()
      .then(res => {
        console.log(res.data);
        const isCome = res.data.find(item => item['работник'] === user.id && item['дата'] === new Date().toISOString().split('T')[0])
        if(isCome){
          setAttendance(true)
        } else {
          setAttendance(false)
        }
        
      })
  }, [active])


  return (
    <div className={c.checkIn}>
      <div className={c.header}>
        <h3>{`${user["имя"]} ${user["фамилия"]}`}</h3>
        <p>{user["должность"]}</p>
      </div>
      <div className={c.check}>
        <div>
          <h1>{user["график_работы"]}</h1>
          {lateMinutes > 0 && !attendanceId ? (
            <p>
              Вы опаздываете!
            </p>
          ) : attendanceId ? (
            <p style={{ color: '#98CA02' }}>
              Вы на работе
            </p> 
          ): null}
        </div>
        <button>
          <img src={Icons.check} alt="" />
          <p onClick={handleCheckIn}>
            {attendanceId ? 'Уйти с работы' : 'Отметиться'}
          </p>
        </button>
      </div>

      {
        active && <Components.Alert type={type} lateTime={lateTime} time={time} setActive={setActive} />
      }
    </div>
  )
}


// завершение смены gps
// звонок работника
// добавить сотрудника
// информация о смене



export default CheckIn