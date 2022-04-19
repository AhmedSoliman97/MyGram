import React from 'react';

import  './Button.css';

const Button = (props) => {
    let cssClasses=["Button"]
    if(props.btnType === 'Success')cssClasses=["Button","Success"];
    if(props.btnType === 'Danger')cssClasses=["Button","Danger"];
    return(
        <button
            className = {cssClasses.join(' ')}
            disabled = {props.disabled}
            onClick = {props.clicked}>{props.children}
        </button>
    );
}

export default Button;