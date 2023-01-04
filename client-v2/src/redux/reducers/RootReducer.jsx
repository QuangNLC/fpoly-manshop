import {combineReducers} from 'redux'
import authReducer from './AuthReducer';
import cartReducer from './CartReducer';
import WaitingOrderReducer from './WaitingOrderReducer';

 const RootReducer=combineReducers({
    cart: cartReducer,
    auth: authReducer,
    waitingOrder: WaitingOrderReducer
})

export default RootReducer;