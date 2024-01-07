import { v4 as uuidv4 } from 'uuid';

const initStatePurchases = [
    //{id: uuidv4(), customerId: '', productId: '', timestamp: ''}
    {id: 'asdf', customerId: '2345', productId: '3456', timestamp: '2024-01-04T22:48:30.407Z'}
]

const purchasesReducer = (state = initStatePurchases, action) => {
    switch(action.type){
        case 'PURCHASE_CREATE':
            return [...state, {...action.payload, id: uuidv4()}]
        case 'PURCHASE_UPDATE':
            var purchases = [...state]
            var purchaseIdx = purchases.findIndex((purchase) => {return purchase.id === action.payload.id})
            purchases.splice(purchaseIdx,1,action.payload)
            return purchases;
        case 'PURCHASE_DELETE':
            return state.filter((item) => {return item.id != action.payload})
        default:
            return state;
    }
}

export default purchasesReducer