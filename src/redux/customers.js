import { v4 as uuidv4 } from 'uuid';

const initStateCustomers = [
    //{id: uuidv4(), city: 'Miami', firstName: 'Amir', lastName: 'Granot'},
    {id: '1234', city: 'Miami', firstName: 'Amir', lastName: 'Granot'},
    //{id: uuidv4(), city: 'Cooper', firstName: 'Matan', lastName: 'Luzon'}
    {id: '2345', city: 'Cooper', firstName: 'Matan', lastName: 'Luzon'}
]

const customersReducer = (state = initStateCustomers, action) => {
    switch(action.type){
        case 'CUSTOMER_CREATE':
            return [...state, action.payload]
        case 'CUSTOMER_UPDATE':
            var customers = [...state]
            var customerIdx = customers.findIndex((customer) => {return customer.id===action.payload.id})
            customers.splice(customerIdx,1,action.payload)
            return customers;
        case 'CUSTOMER_DELETE':
            return state.filter((item) => {return item.id != action.payload})
        default:
            return state;
    }
}

export default customersReducer