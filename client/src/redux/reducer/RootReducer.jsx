import {combineReducers} from 'redux'
import GioHangReducer from './GioHangReducer'
import cartReducer from './CartReducer';

 const RootReducer=combineReducers({
    GioHangReducer,
    cartReducer
})

export default RootReducer;