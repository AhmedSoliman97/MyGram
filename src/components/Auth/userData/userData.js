import React ,{useState} from "react";
import { Navigate } from "react-router";
import { connect } from "react-redux";

import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Toolbar from "../../toolbar/toolbar";
import {uploading} from '../../../store/index' 
import './userData.css'

const UserDataForm=(props)=>{
    const [formcontrol,setFormControl] = useState({
        controls: { 
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'UserName'
                },
                value: '',
                validation: {
                    required: true,
                    isText: true,
                    maxLength:20,
                    minLength:3
                },
                valid: false,
                touched: false
            },
            userJobTitle: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'JobTitle'
                },
                value: '',
                validation: {
                    required: true,
                    isText: true,
                    maxLength:20,
                    minLength:5
                },
                valid: false,
                touched: false
            },
            userBio: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'UserBio'
                },
                value: '',
                validation: {
                    required: true,
                    isText: true,
                    maxLength:50,
                },
                valid: false,
                touched: false
            },
            userPersonalSite: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PersonalSiteLink'
                },
                value: '',
                validation: {
                    required: true,
                    isText: true,
                    maxLength:30
                },
                valid: false,
                touched: false
            },
            userPersonalPic: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    placeholder: 'Profile Picture',
                    accept:'.jpg',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: true,
                touched: true
            },
           
        },
       
    });
    const[submitted,setSubmitted]=useState(false);
    const [profilePicture,setProfilePicture] = useState(null)
    
    const inputChangedHandler = (event, controlName) => {
        
        if(controlName === 'userPersonalPic'){
            const item = event.target.files[0];
            event.preventDefault();
            const reader =new FileReader();
            reader.onload=(event)=>{
                
                setProfilePicture(event.target.result);
                
            }
            reader.onerror=()=>{
                console.log('Error while uploading profile Pic',reader.error)
            };
            reader.readAsDataURL(item);

        }
        else{
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
        
    }
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
    const submitHandler=(event)=>{
        event.preventDefault();
        const tempdata= props.Data;
        const userData={
            Name:formcontrol.controls.userName.value,
            Bio:formcontrol.controls.userBio.value,
            Title:formcontrol.controls.userJobTitle.value,
            WebSiteLnk:formcontrol.controls.userPersonalSite.value,
            ProfilePic:profilePicture
        }; 
        
    tempdata.userPersonalData=userData;
    props.onUploadUserData(tempdata);
    setSubmitted(true);
       
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
            myKey={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={( event ) => inputChangedHandler( event, formElement.id )} />
    ) )
    const Classes=["userDataForm","useDataFormOpen"];
    console.log(submitted);
    return(
        <div>
            <Toolbar/>
                <div className={Classes.join(' ')}>
    
                    <form onSubmit={submitHandler}>
                        {form}
                        <Button btnType="Success">Submit </Button>
                    </form>
                   {submitted?<Navigate to='/Home' replace />:null}
                
                    
                </div>
            
        </div>
    )

};

const mapPropsToState=state=>{
    return{
        Data:state.Data.data
    }
}

const mapStateToDispatch=dispatch=>{
    return{
        onUploadUserData:(data)=>dispatch(uploading(data))
    }
}

export default connect(mapPropsToState,mapStateToDispatch)(UserDataForm);