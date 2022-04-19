import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Logout,clear_data} from '../../store/index';


import './toolbar.css';


const Toolbar=(props)=>{

    const logoutHandelr=()=>{
        props.onLogout();
        props.onClearData()//to clear the data when press logout
    }
    const changePersonalDataHandelr=()=>{
        
    }
    
    return(
        
        <div className='Toolbar'>
           <p>Mygram</p>
           <NavLink to='/contactdata' onClick={changePersonalDataHandelr} activeclassname="active" style={{display:props.isAuth?'block':'none'}}>Edit Profile</NavLink>
           <NavLink to= '/Home' activeclassname="active" style={{display:props.isAuth?'block':'none'}}>Home</NavLink>
           <NavLink to='/' activeclassname="active"  style={{display: !props.isAuth?'block':'none'}}>Authentication</NavLink>
           <NavLink to='/' activeclassname="active" onClick={logoutHandelr}style={{display:props.isAuth?'block':'none'}}>Logout</NavLink>
           
        </div> 

    )
}

const mapStateToProps=state=>{
    return{
        isAuth:state.Auth.token !== null
    }
}

const mapPropsToDispatch=dispatch=>{
    return{
        onLogout:()=>dispatch(Logout()),
        onClearData:()=>dispatch(clear_data())
    }
}

export default connect (mapStateToProps,mapPropsToDispatch)(Toolbar);