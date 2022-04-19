import axios from '../../axios-order';

import * as actionType from './actions';


const upload_start=()=>{
    return{
        type:actionType.UPLOAD_START,
    }
}

export const upload_success=(data)=>{
    return{
        type:actionType.UPLOAD_SUCCESS,
        Data:data,
    }
}

const upload_failed=(err)=>{
    return{
        type: actionType.UPLOAD_FAILED,
        error: err
    }
}
export const clear_data=()=>{
    return{
        type: actionType.CLEAR_DATA,
    }
}

export const uploading=(dataa)=>{
    return dispatch=>{
        dispatch(upload_start());
        
        const preparedData={
            user_Id:localStorage.getItem('localId'),
            data:dataa
        }
        axios.get('/users.json').then(response=>{
            if(response.data){
                let dataObject={};
                let foundUser=false;
                for(let key in response.data){
                    dataObject= response.data[key];
                    if(dataObject.user_Id === preparedData.user_Id){
                        foundUser=true;
                        axios.delete(`/users/${key}.json`).then(res=>{
                            console.log('dataJS: user found and deleted');
                            axios.post('/users.json',preparedData).then(response=>{
                                dispatch(upload_success(dataa));
                                console.log('dataJS: user found and replaced');
                            }
                            ).catch(err=>{upload_failed(err.response.data.error)})
                            }).catch(err=>{upload_failed(err.response.data.error)})
                    }
                }
                if(!foundUser){
                    axios.post('/users.json',preparedData).then(response=>{
                        console.log('dataJS: new user Added',dataa);
                        dispatch(upload_success(dataa));
                    }
                    ).catch(err=>{upload_failed(err.response.data.error)})
                }
            }
            else{
                axios.post('/users.json',preparedData).then(response=>{
                    console.log('dataJS:first user in');
                    dispatch(upload_success(dataa));
                }).catch(err=>{
                    dispatch(upload_failed(err.response.data.error))
                })
            }
        }
        ).catch(err=>{upload_failed(err.response.data.error)});

    }    

}
