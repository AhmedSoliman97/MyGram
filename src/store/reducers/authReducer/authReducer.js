import * as actionType from '../../actions/actions'

const initState={
    
    token:null,
    userId:null,
    loading:false,
    error:null,
}

const AuthReducer=(State=initState,action)=>{
    switch (action.type) {
        case (actionType.AUTH_START):
            return{
                ...State,
                loading:true,
                error:null,
            };
        case (actionType.AUTH_SUCCESS):
            return{
                ...State,
                loading:false,
                token:action.token,
                userId:action.userId,
                error:null,
            };
        case (actionType.AUTH_FAILED):
            return{
                ...State,
                loading:false,
                token:null,
                userId:null,
                error:action.error
            };
        case (actionType.LOG_OUT):
            return{
                ...State,
                token:null,
                userId:null,
            };
        default:return State;
    }
}

export default AuthReducer;