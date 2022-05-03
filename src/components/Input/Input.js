import React from 'react';
import  './Input.css'

const Input=(props)=>{
    let inputElement=null;
    let inputClasses=["InputElement"];//tochange the css dynamic
    let errorMsg=null;
    if(props.touched && props.invalid){inputClasses.push("Invalid");errorMsg=(<p className="ErrorMsg">Please Inter a Valid Value !</p>)}
    


    switch(props.elementType){
        case('input'):
            if(props.myKey !== 'userPersonalPic'){inputElement=<input onChange={props.changed} className={inputClasses.join(' ')} autoComplete='none' {...props.elementConfig} value={props.value}/>;}
            else{inputElement=
                <div >
                    <label htmlFor="pic" className='profilePiC' >choose profile Picture</label>
                    <input  id="pic" style={{visibility:"hidden"}}  
                    onChange={props.changed} 
                    className={inputClasses.join(' ')} 
                    autoComplete='none' 
                    {...props.elementConfig} />
                </div>
                
            }

            

        break;
        case('textarea'):inputElement=<textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
        break;
        case('select'):
        inputElement=(<select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
        
        {props.elementConfig.options.map(option=>(
            <option key={option.value}  value={option.value}> {option.displayValue}</option>))}
        
        </select>);
        break;
        default:inputElement=<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
    };
    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {errorMsg}
            
        </div>
    );

}


export default Input;