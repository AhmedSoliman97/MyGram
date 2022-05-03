import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../toolbar/toolbar';
import {authentication} from '../../../store/index';

import {Navigate} from 'react-router-dom';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import './Authform.css'





const Auth =(props)=> {
    
    const [formcontrol,setFormControl] = useState({
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
    });

    const [isSignUp,setIsSignUp] = useState(false);
    

    const checkValidity=(value, rules)=> {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
    
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
    
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
    
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
    
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
    
        return isValid;
    }


    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...formcontrol.controls,
            [controlName]: {
                ...formcontrol.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, formcontrol.controls[controlName].validation),
                touched: true
            }
        };
        setFormControl({controls: updatedControls});
    }
    
    const onSigninHandelr=()=>{
        setIsSignUp(!isSignUp)
    
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email= formcontrol.controls.email.value ;
        const password= formcontrol.controls.password.value;
        props.onSubmitForm(email,password,isSignUp)
         
    }
   

        const formElementsArray = [];
        for ( let key in formcontrol.controls ) {
            formElementsArray.push( {
                id: key,
                config: formcontrol.controls[key]
            } );
        }
        
        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) )
        
        const Classes=["Auth","AuthOpen"];

        return (
            
            <div>
                
                <Toolbar/>
                <div className={Classes.join(' ')}>
                {props.isError?<h3 style={{color:'red'}}>{props.isError} </h3>:null}
                    <form onSubmit={submitHandler}>
                        {form}
                        <Button btnType="Success">{isSignUp?'SignUp':'SignIn'}</Button>
                    </form>
                    <Button btnType="Danger" clicked={onSigninHandelr}> {isSignUp?<span style={{color:'black'}}>or if you account ? </span>:<span style={{color:'black'}}>or for new account? </span>} {isSignUp?'SignIn':'SignUp'}</Button>
                    {props.isAuth && !isSignUp?<Navigate to='/Home' replace/>:props.isAuth && isSignUp?<Navigate to='/contactdata' replace/>:null}
                    
                </div>
            </div>
        );
    
    
}

const mapStateToProps=state=>{
    return{
        isAuth:state.Auth.token!== null,
        isError:state.Auth.error,  
    }

}

const mapPropsToState=dispatch=>{
    return {
        onSubmitForm:(email,password,isSignUp)=>dispatch(authentication(email,password,isSignUp)),
    }
}

export default connect(mapStateToProps,mapPropsToState)(Auth) ;
