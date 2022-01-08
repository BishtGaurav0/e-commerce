import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import userReducer from './userReducer';
import viewDetails from "./viewDetails";

const allReducers = combineReducers({
    cartData: cartReducer,
    userRed : userReducer,
    viewDetail : viewDetails

})

export default allReducers;