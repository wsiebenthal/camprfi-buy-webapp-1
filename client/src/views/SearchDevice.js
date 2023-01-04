import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getDeviceByKeyword,
} from "../services/InternalApiService";

export const SearchDevice = (props, { history }) => {
  const navigate = useNavigate();

  const [deviceNumber, setDeviceNumber] = useState("");
  const [errors, setErrors] = useState(null);
  const [devices, setDevices] = useState([]);
  const [id, setId] = useState([]);

  function validateForm(deviceNumber) {
    if (!deviceNumber.trim()) {
      return "Device number is required";
    } else if (deviceNumber.length < 6) {
      return "Device number needs to be 6 characters or more";
    }
    return null;
  }

  const handleDeviceSubmit = (event) => {
    event.preventDefault();

    console.log("device number:", deviceNumber);
    // if (deviceNumber){
    //   history.pushState(`/devices/search/${deviceNumber}`)
    // }
    // else{
    //     history.pushState('/')

    //   }

    const resultError = validateForm(deviceNumber);
    console.log(resultError);

    if (resultError !== null) {
      setErrors(resultError);
      return;
    }

    getDeviceByKeyword(deviceNumber)
      .then((data) => {
        console.log("device number:", deviceNumber);
        console.log("device data:", data[0]._id);
        setDevices(data);
        setId(data);
        navigate(`/devices/${data[0]._id}`);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error?.response?.data?.errors);
      }, []);
  };

  return (
    <div className="search-device-container">
      <div className="w-50 p-4 rounded mx-auto shadow">
        <form onSubmit={(e) => handleDeviceSubmit(e)}>
          <div className="form-group">
            <label className="h3">Enter Device Number:</label>
            {errors && <span style={{ color: "red" }}> {errors}</span>}
            <input
              onChange={(event) => {
                setDeviceNumber(event.target.value);
              }}
              type="text"
              className="form-control search-box"
              placeholder="XXXXXX"
            />
          </div>
          <button className="btn">Choose a plan!</button>
        </form>
      </div>

      {devices.map((device) => {
        const { _id, name } = device;

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
