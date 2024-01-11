import {v4 as uuidv4} from 'uuid'

const initState = {
    customers: [
        {id: '6487fcfd-2e48-4e67-b7c6-4f35fb986956', city: 'Miami', firstName: 'Amir', lastName: 'Granot'},
        {id: 'b27c9d63-6c5c-4ac0-b61b-c3fdbd67667d', city: 'Cooper', firstName: 'Matan', lastName: 'Luzon'}
    ],
    products: [
        {id: '1', name: 'Yacht',price: 8, quantity: 50},
        {id: '2', name: 'Tesla',price: 2, quantity: 100}
    ],
    productsLastId: 3, // the last id of products + 1
    purchases: [
        //{id: 'a8298c74-a355-4caf-9086-61c167cd0f4d', customerId: '6487fcfd-2e48-4e67-b7c6-4f35fb986956', productId: '1', date: '2024-01-04'},
        //{id: '9cd5cf01-03bf-4537-ab0f-bee019e3eed3', customerId: 'b27c9d63-6c5c-4ac0-b61b-c3fdbd67667d', productId: '2', date: '2024-01-04'}
    ],
    error: undefined
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'PRODUCT_CREATE': // payload is a new object of product {name, quantity, price}
            return {...state, productsNextId: productsNextId + 1, products:[...state.products, {...action.payload, id: state.productsNextId}]};
        case 'PRODUCT_UPDATE': // payload is a modified object of product {id, name, quantity, price}
            var products = [...state.products]
            var productIdx = products.findIndex((product) => {return product.id === action.payload.id})
            products.splice(productIdx, 1, action.payload)
            return {...state, products};
        case 'PRODUCT_DEC_QUANTITY': // payload is productId
            var products = [...state.products]
            var productIdx = products.findIndex((product) => {return product.id === action.payload})
            if(products[productIdx].quantity === 0){
                const error = {errorMessage: "product quantity cannot be lower than 0", type: action.type, payload: action.payload}
                state = {...state, error}
            }
            else{
                products[productIdx].quantity--
                state = {...state, products}
            }
            return state;
        case 'PRODUCT_INC_QUANTITY': // payload is productId
            var products = [...state.products]
            var productIdx = products.findIndex((product) => {return product.id === action.payload})
            products[productIdx].quantity++
            return {...state, products};
        case 'PRODUCT_DELETE': // payload is productId
            state.purchases.filter((purchase) => {
                return purchase.productId === action.payload
            }).forEach((purchase) => {
                // remove all product purchases
                state = rootReducer(state, {type:'PURCHASE_DELETE',payload:purchase.id})
            })
            return {
                ...state,
                products: state.products.filter((item) => {
                    return item.id != action.payload
                })
            }
        case 'PURCHASE_CREATE': // payload is a new object of customer {productId, customerId}
            if(action.payload.productId == '' || action.payload.customerId == ''){
                console.warn('productId or customerId were missing in PURCHASE_CREATE redux reducer call',action.payload)
                return state
            }
            state = rootReducer(state,{type:'PRODUCT_DEC_QUANTITY',payload:action.payload.productId})
            if(state.error){
                console.warn('cannot purchase product',action,state.error)
                state.error = undefined
                return state
            }
            return {
                ...state,
                purchases: [
                    ...state.purchases,
                    {
                        id: uuidv4(),
                        ...action.payload,
                        date: new Date().toISOString().slice(0, 10)
                    }
                ]
            }
        case 'PURCHASE_UPDATE': // payload is a modified object of customer {productId, customerId, date}
            var purchases = [...state.purchases]
            var purchaseIdx = purchases.findIndex((purchase) => {return purchase.id === action.payload.id})
            purchases.splice(purchaseIdx,1,action.payload)
            return {...state,purchases};
        case 'PURCHASE_DELETE': // payload is purchaseId
            const purchase = state.purchases.find(purchase => purchase.id === action.payload)
            state = rootReducer(state, {type:'PRODUCT_INC_QUANTITY', payload: purchase.productId})
            return {
                ...state,
                purchases: state.purchases.filter((item) => {return item.id != action.payload})
            }
        case 'CUSTOMER_CREATE': // payload is a new object of customer {firstName, lastName, city}
            return {...state, customers: [...state.customers, {...action.payload, id:uuidv4()}]}
        case 'CUSTOMER_UPDATE': // payload is a modified object of customer {id, firstName, lastName, city}
            var customers = [...state.customers]
            var customerIdx = customers.findIndex((customer) => {return customer.id === action.payload.id})
            customers.splice(customerIdx, 1, action.payload)
            return {...state, customers};
        case 'CUSTOMER_DELETE': //payload is customerId
            state.purchases.filter((purchase) => {
                return purchase.customerId === action.payload
            }).forEach((purchase) => {
                // remove all customer purchases
                state = rootReducer(state, {type:'PURCHASE_DELETE',payload:purchase.id})
            })
            return {
                ...state,
                customers: state.customers.filter((item) => {return item.id != action.payload})
            }
        default:
            return state;
    }
}

export default rootReducer