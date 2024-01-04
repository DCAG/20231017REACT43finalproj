import { v4 as uuidv4 } from 'uuid';

const initStateProducts = [
    //{id: uuidv4(), name: 'Soap',price: 8, quantity: 50},
    {id: '3456', name: 'Soap',price: 8, quantity: 50},
    //{id: uuidv4(), name: 'Sponge',price: 2, quantity: 100}
    {id: '4567', name: 'Sponge',price: 2, quantity: 100}
]

const productsReducer = (state = initStateProducts, action) => {
    switch(action.type){
        case 'PRODUCT_CREATE':
            return [...state, action.payload];
        case 'PRODUCT_UPDATE':
            var products = [...state]
            var productIdx = products.findIndex((product) => {return product.id === action.payload.id})
            products.splice(productIdx,1,action.payload)
            return products;
        case 'PRODUCT_DELETE':
            return state.filter((item) => {return item.id != action.payload})
        default:
            return state;
    }
}

export default productsReducer