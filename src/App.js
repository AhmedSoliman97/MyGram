import React, { Component } from 'react';
import { Routes,Route } from 'react-router';
import { connect } from 'react-redux';

import './App.css';
import Gallary from './containers/gallary';
import Authform from './components/Auth/authForm/Authform';
import {checkAuthState} from './store/index';
import UserDataForm from './components/Auth/userData/userData';



class App extends Component{ 
  
  componentDidMount(){
    this.props.onCheckAuth(); 
  };
  render(){
      return (
        <div className='App'> 
          <Routes>
              <Route path='/Home' element={<Gallary />}/>
              <Route path='/contactdata'  element={<UserDataForm />} />
              <Route path='/'  element={<Authform />} />
          </Routes> 
        </div>
      
      );
  }
}

const mapStateToProps=state=>{
  return{
    isAuth:state.Auth.token !== null
  }
}

const mapPropsToState=dispatch=>{
  return{
    onCheckAuth:()=>dispatch(checkAuthState()),
  }
}


export default connect(mapStateToProps,mapPropsToState)(App);
