import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getDeviceById, getDeviceByKeyword } from '../services/InternalApiService';

export const SearchDevice = (props, {history}) => {
  const navigate = useNavigate();

  const [deviceNumber, setDeviceNumber] = useState('');
  const [errors, setErrors] = useState(null);
  const [devices, setDevices] = useState([]);
  const [id, setId] = useState([]);

  const handleDeviceSubmit = (event) => {
    event.preventDefault();

    // if (deviceNumber){
    //   history.pushState(`/devices/search/${deviceNumber}`)
    // }
    // else{
    //     history.pushState('/')

    //   }

   

    getDeviceByKeyword(deviceNumber)
      .then((data) => {
        
        console.log('device number:', deviceNumber);
        console.log('device data:', data[0]._id);
        setDevices(data);
        setId(data);
        // navigate(`/devices/${data[0]._id}`);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error?.response?.data?.errors);
      }, []);
  };

  

  return (

   
    <div>
    <div className="w-50 p-4 rounded mx-auto shadow">
      
      <form onSubmit={(e) => handleDeviceSubmit(e)}>
        <div className="form-group">
          <label className="h6">Enter Device Number:</label>
          {errors?.deviceNumber && (
            <span style={{ color: 'red' }}> {errors?.deviceNumber?.message}</span>
          )}
          <input
            onChange={(event) => {
              setDeviceNumber(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-sm btn-outline-success">Submit</button>
        
      </form>
    </div>

    {devices.map((device) => {
      const { _id, name } =
        device;

      return (
        <div key={_id} className="shadow mb-4 rounded border p-4">
          <table>
          <tr>
            <th>Device</th>
            <th>Actions</th>
          </tr>

          <tr>
            <td>
            <Link to={`/devices/${_id}`}>
                      <h4>{name}</h4>
                    </Link>
            </td>
            <td>
            <div className="mt-2">
            <Link to={`/products`}>
                      <h4>Purchase</h4>
                    </Link>
          </div>
            </td>
          </tr>
          
        </table>
        </div>
      );
    })}
    </div>

  );
  
};

export default SearchDevice;