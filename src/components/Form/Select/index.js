import React from 'react';

const LightSelector = ({onChange, label, field, options, id, description,name,value}) => {

    return (
    <div className="form-inner-wrapper">
        { label && <label className="form-select-label">{label}</label>}
            <div className=" form-input-container-select">
              <select className="form-select"  onChange={onChange} name={name}> 
                <option value="" selected={!value}>{field}</option>
                {options.map(option=>( id ?
                  <option value={option[id]} selected={value ? option[id] === value : false}>{option[description]}</option>
                  : <option value={option} selected={option === value}>{option}</option>
                ))}
              </select>
            </div>
      </div>
    )
}

export default LightSelector