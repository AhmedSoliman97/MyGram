import axios from 'axios';

import * as actionType from '../actions/actions';



const Auth_Start=()=>{
    return{
        type:actionType.AUTH_START
    }
}
const Auth_failed=(err)=>{
    return{
        type:actionType.AUTH_FAILED,
        error:err
    }
}
const Auth_success=(user_token,user_Id)=>{
    return{
        type:actionType.AUTH_SUCCESS,
        token: user_token,
        userId: user_Id
    }
}

export const Logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("localId");
    return{
        type:actionType.LOG_OUT
    }
}

const timeToLogout=(expirateTime)=>{
    return dispatch=>{
        setTimeout(()=>{return dispatch(Logout())},expirateTime*1000)
    }
}


export const checkAuthState=()=>{
   
    return dispatch=>{
        const token   = localStorage.getItem('token');
        const localId = localStorage.getItem('localId');
        if(!token){
            dispatch(Logout());
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){  
                dispatch(Auth_success(token, localId ));
                timeToLogout((expirationDate.getSeconds() - (new Date().getSeconds())));
                
            }
            else{
                dispatch(Logout()) ;
            }
        }
    } 
};


export const authentication=(email,password,isSignUp)=>{
    
    return dispatch=>{
        const AuthData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url=null;
        if(isSignUp)
        {url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_lnaH188C12fP2dUFs6Nr-oIjyK7Km9s'}
        else {url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_lnaH188C12fP2dUFs6Nr-oIjyK7Km9s'}
        dispatch(Auth_Start());
        axios.post(url,AuthData).then(res=>{

            const expirationDate=new Date(new Date().getTime() + res.data.expiresIn*1000)
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('localId',res.data.localId);

            dispatch(Auth_success(res.data.idToken,res.data.localId) );
            dispatch(timeToLogout(res.data.expiresIn))
        }).catch(err=>{
            dispatch(Auth_failed(err.response.data.error))
        }) 
        
    
    }      

}