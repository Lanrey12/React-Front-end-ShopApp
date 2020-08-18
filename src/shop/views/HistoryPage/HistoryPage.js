import React, {useState, useEffect} from 'react'
import Axios from 'axios'

function HistoryPage(props) {

    const [History, setHistory] = useState([])
    const baseUrl = "http://localhost:5000/accounts";
    const getHistory = () => {
        Axios.get(`${baseUrl}/user/getHistory`)
        .then(res => {
            if(res.data.success){
                    setHistory(res.data.history)
            }else{
                alert('Failed to get History')
            }
        })
    }

    useEffect(getHistory,[])

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>

                    {History.map(item => (
                          <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.dateOfPurchase}</td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
