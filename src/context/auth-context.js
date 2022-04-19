import React,{useState} from 'react';


export const Auth_context=React.createContext(
    {
        Auth:false,
        Login:()=>{},
        Logout:()=>{}
    }
) 

const Auth_provider=(props)=>{
    const [initAuth,setInitAuth]=useState(false);
    const loginHandelr=()=>{
        setInitAuth(true);
        console.log('context:  loggedin');
        
    }
    const logoutHandelr=()=>{
        setInitAuth(false);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('localId'); 
        console.log('loggedout');
        
    }

    return(
        <div>
            <Auth_context.Provider value={{Auth:initAuth, Login:loginHandelr,Logout:logoutHandelr}} >
                {props.children}
            </Auth_context.Provider>
        </div>
    );
};

export default Auth_provider;