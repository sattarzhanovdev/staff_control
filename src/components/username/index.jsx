import { useEffect, useState } from 'react';
import { API } from '../../api';

const userCache = {}; // глобально (один раз на сессию)

const UserName = ({ id }) => {
  const [name, setName] = useState('Загрузка...');

  useEffect(() => {
    if (userCache[id]) {
      setName(userCache[id]);
    } else {
      API.getUser(id)
        .then(res => {
          const fullName = `${res.data.имя} ${res.data.фамилия}`;
          userCache[id] = fullName;      // кэшируем
          setName(fullName);
        })
        .catch(() => setName('Неизвестно'));
    }
  }, [id]);

  return <>{name}</>;
};

export default UserName;
