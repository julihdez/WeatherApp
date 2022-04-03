import React from 'react';
import palette from "../../../Utils/Colors"

const LightInput = ({label,defValue,...props}) =>{
    return (
        <div className="form-input-container">
          <input style={{color:palette.verde_primario, fontSize:"12px", fontFamily:"Roboto"}} {...props} defaultValue={defValue} className="light-input" placeholder={label} />
        </div>
    )
}

export default LightInput