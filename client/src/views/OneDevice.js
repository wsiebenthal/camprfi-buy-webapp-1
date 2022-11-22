import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getDeviceById,
} from '../services/InternalApiService';

export const OneDevice = (props) => {
  const [device, setDevice] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDeviceById(id)
      .then((data) => {
        console.log(data);
        setDevice(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (device === null) {
    return null;
  }


  const { name } =
    device;

  return (
    <div className="w-100 mx-auto shadow mb-4 rounded border p-4">
      <h5>Devices:</h5>
      <h4>{name}</h4>

      <div className="mt-2">
      </div>
    </div>
  );
};

export default OneDevice;