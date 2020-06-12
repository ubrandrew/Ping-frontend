import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { PlaidLink } from "react-plaid-link";

export default function Accounts(props) {
    const [accounts, setAccounts] = useState([
        {
            accountName: "PNC Reserve",
        },
        {
        accountName: "PNC Savings",
        },
        {
            accountName: "Chase Checking",
        },
        {
            accountName: "Bank of America Checking",
        },
        {
            accountName: "Chase Savings",
    }])

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/accounts`)
    //     .then( res => {
    //         setAccounts(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [])

    const handleOnSuccess = (public_token, metadata) => {
        console.log(public_token)
        axios.post(`http://localhost:8000/auth/exchange_token`, {
            public_token: public_token
        });
    }

    const handleOnExit = () => {

    }


    return (
        <div>
          {/* <ul>
              {accounts.map(elem => <li>{elem.accountName}</li>)}
          </ul> */}
            <PlaidLink
                clientName="Spare"
                env="sandbox"
                product={["transactions"]}
                publicKey="9a813a0812e9cd737aa5b6a5efd71e"
                onExit={handleOnExit}
                onSuccess={handleOnSuccess}
                className="test"
            >
                Open Link and connect your bank account!
            </PlaidLink>

        </div>
    )
}