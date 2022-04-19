import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import  {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import DataReducer from './store/reducers/dataReducer/dataReducer';
import AuthReducer from './store/reducers/authReducer/authReducer';



const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null ||compose;
/*the NOD_ENV is to be development in the the develop stage and otherwise in the running with user stage
automaticaly compose for middleware and other one for the basic which is without middleware*/

const rootReducer = combineReducers({
     Auth:AuthReducer,
     Data: DataReducer,
}); 


const Store=createStore(rootReducer,composeEnhancers(
     applyMiddleware(thunk)) );

ReactDOM.render(
<Provider store={Store}>
     <BrowserRouter>
          <App/>
     </BrowserRouter>
</Provider>,
document.getElementById('root'));
registerServiceWorker();
