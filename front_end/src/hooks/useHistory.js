import { useEffect, useState } from 'react';
import api from '../api/api';

const useHistory = () => {
   const [history, setHistory] = useState([]);

   useEffect(() => {
      getHistory()
   });

   const getHistory = async () => {
      const response = await api.get('/history', {
         params: {

         }
      });

      setHistory(response.data.items);
   };
   return [history, getHistory];
};

export default useHistory;
