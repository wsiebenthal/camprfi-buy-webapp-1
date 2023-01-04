import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataPlansForm } from "../components/data-plans-form/data-plans-form.component";

import { getDeviceById } from "../services/InternalApiService";
import { DeviceInfo } from "../components/device-info/device-info.component";

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

  const { name } = device;

  return (
    <div>
    <DeviceInfo name={name}></DeviceInfo>

      <div></div>
      <div className="w-50 p-4 rounded mx-auto shadow">
        <DataPlansForm></DataPlansForm>
      </div>
    </div>
  );
};

export default OneDevice;
