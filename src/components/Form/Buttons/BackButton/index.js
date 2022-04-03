import React from 'react';
import {SubmitButton} from "../../../index"

function BackButton({onClick}) {


    return (
    <div className="back-button">
        <SubmitButton name="Volver" onClick={onClick}/>
    </div>
    )
}

export default BackButton
