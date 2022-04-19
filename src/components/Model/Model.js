import React from "react";
import './Model.css'

const Model=(props)=>{
    const Classes=["Model",props.show?"ModelOpen":"ModelClose"]
    return(
        <div className={Classes.join(' ')} onClick={props.closeModel} >
            {props.children}       
        </div>
    )
}
export default Model;