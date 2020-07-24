import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlaidLink } from "react-plaid-link";
import firebaseClient from "../auth/firebase";
import { AuthContext } from "../auth/auth";

export default function LinkBankItem(props) {
  const [accounts, setAccounts] = useState([]);
  const webhookURL = process.env.PLAID_WEBHOOK_URL

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
    firebaseClient
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        console.log(public_token);
        axios
          .post(
            `auth/exchange_token`,
            { public_token },
            { headers: { Authorization: `Bearer ${idToken}` } }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnExit = () => {};

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
        webhook={webhookURL}
      >
        Open Link and connect your bank account!
      </PlaidLink>
    </div>
  );
}
