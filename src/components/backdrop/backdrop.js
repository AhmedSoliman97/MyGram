import React from "react";
import './backdrop.css'

const Backdrop=(props)=>{
    const Classes=["Backdrop",props.show?"BackdropOpen":"BackdropClose"];
    return(
        <div className={Classes.join(' ')} onClick={props.closed}>
        
        </div>

    )
}

export default Backdrop;