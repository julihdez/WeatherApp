import React from 'react'

const SubmitButton = ({name, onClick, ...props}) => {
    return (
        <div className="form-button-wrapper-container">
            <button {...props} className="form-button-submit" type="submit" onClick={onClick}>{name}</button>
        </div>
    )
}

export default SubmitButton;