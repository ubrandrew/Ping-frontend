import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountsPage = (props) => {
    const [accounts, setAccounts] = useState([]);

    const otherEndpoint = (event) => {
        event.preventDefault()
        axios.defaults.withCredentials = true

        axios.get(
            `http://localhost:8000/bank_items`, 
        )
        .then(res => {
            console.log(res)
        })
    }

    useEffect(() => {
        axios.get(
            `http://localhost:8000/bank_items`, 
        )
        .then(res => {
            console.log(res.data)
            let arr = res.data.map(elem => {
                return elem.institution.name
            })
            setAccounts(arr)
            console.log(arr)
        })
    }, [])


    return (
        <div>
            <ul>
                <li>
                    {/* Every account gets a list element */}
                    {/* By defualt, the first transaction is expanded  */}
                </li>
            </ul>
        </div>
    )
}

export default AccountsPage;