
const initState = {
    customers: [
        //{id: uuidv4(), city: 'Miami', firstName: 'Amir', lastName: 'Granot'},
        {id: '1234', city: 'Miami', firstName: 'Amir', lastName: 'Granot'},
        //{id: uuidv4(), city: 'Cooper', firstName: 'Matan', lastName: 'Luzon'}
        {id: '2345', city: 'Cooper', firstName: 'Matan', lastName: 'Luzon'}
    ],
    products: [
        //{id: uuidv4(), name: 'Soap',price: 8, quantity: 50},
        {id: '3456', name: 'Soap',price: 8, quantity: 50},
        //{id: uuidv4(), name: 'Sponge',price: 2, quantity: 100}
        {id: '4567', name: 'Sponge',price: 2, quantity: 100}
    ],
    purchases: [
        //{id: uuidv4(), customerId: '', productId: '', timestamp: ''}
        {id: 'abcd', customerId: '1234', productId: '3456', date: '2024-01-04'},
        {id: 'bcde', customerId: '2345', productId: '4567', date: '2024-01-04'}
    ],
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'PRODUCT_CREATE': // payload is a new object of product {name, quantity, price}
            return {...state, products:[...state.products, {...action.payload, id: uuidv4()}]};
        case 'PRODUCT_UPDATE': // payload is a modified object of product {id, name, quantity, price}
            var products = [...state.products]
            var productIdx = products.findIndex((product) => {return product.id === action.payload.id})
            products.splice(productIdx, 1, action.payload)
            return {...state, products};
        case 'PRODUCT_DEC_QUANTITY': // payload is productId
            var products = [...state.products]
            var productIdx = products.findIndex((product) => {return product.id === action.payload})
            products[productIdx].quantity--
            return {...state, products};
        case 'PRODUCT_INC_QUANTITY': // payload is productId
            var products = [...state.products]
            var productIdx = products.findIndex((product) => {return product.id === action.payload})
            products[productIdx].quantity++
            return {...state, products};
        case 'PRODUCT_DELETE': // payload is productId
            return {
                ...state,
                products: state.products.filter((item) => {
                    return item.id != action.payload
                })
            }
        case 'PURCHASE_CREATE': // payload is a new object of customer {productId, customerId}
            state = rootReducer(state,{type:'PRODUCT_DEC_QUANTITY',payload:action.payload.productId})
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