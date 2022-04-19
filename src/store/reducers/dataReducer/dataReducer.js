import * as actionType from '../../actions/actions'

const initState={
    data:{
        images:[],
        videos:[],
        favorites:[],
        userPersonalData:{
            Name:'',
            Bio:'',
            Title:'',
            WebSiteLink:'',
            ProfilePic:''
        }
    }, 
    loading:false,
    error:null,
}

const DataReducer=(state=initState , action)=>{
    switch (action.type) {
        case (actionType.UPLOAD_START):
            return{
                ...state,
                loading:true,
            }
        case (actionType.UPLOAD_SUCCESS):
            return{
                ...state,
                loading:false,
                data:action.Data,
                error:null,
            }
        case (actionType.UPLOAD_FAILED):
            return{
                ...state,
                loading:false,
                error:action.error,
            }
        case (actionType.DOWNLOAD_START):
            return{
                ...state,
                loading:true,
            }
        case (actionType.DOWNLOAD_SUCCESS):
            return{
                ...state,
                loading:false,
                data:action.Data,
                error:null,
            }
            
        case (actionType.DOWNLOAD_FAILED):
            return{
                ...state,
                loading:false,
                error:action.error,
            }
        case (actionType.CLEAR_DATA):
            return{
                ...state,
                data:{
                    images:[],
                    videos:[],
                    favorites:[], 
                },
                loading:false,
                error:null,
            }     
    
        default:return state;
    }
}

export default DataReducer;