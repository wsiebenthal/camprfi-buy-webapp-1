import React from "react";
import "./device-info.css";

export const DeviceInfo = (props) => {
    const { name } = props;
    return (

        <div>
            <div className="w-50 p-4 rounded mx-auto">
                <h4 className="purple-font-underlined">DEVICE</h4>
            </div>
            <div className="w-50 p-4 rounded mx-auto device">
                <h4 className="white-font">{name}</h4>
            </div>

        </div>



    )

};

export default DeviceInfo;
