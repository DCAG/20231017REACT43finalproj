import React from 'react'

function Customers() {
  return (
    <div>
        <h1>Customers</h1>

        <table>
            <thead>
                <th>
                    <td>name</td>
                    <td>product names</td>
                    <td>purchased dates</td>
                </th>
            </thead>
            <tbody>
                {
                    customers.map((customer) => {
                        return (
                            <tr>
                                <td>{customer.name}</td>
                                {
                                    purchases.filter(purchase => {
                                        return purchase
                                    })
                                }
                                <td></td>
                                <td></td>
                            </tr>
                            )        
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Customers