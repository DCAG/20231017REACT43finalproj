import { combineReducers } from "redux";
import customersReducer from './customers'
import purchasesReducer from './purchases'
import productsReducer from './products'

const rootReducer = combineReducers({
    customers: customersReducer,
    products : productsReducer,
    purchases: purchasesReducer
})

export default rootReducer