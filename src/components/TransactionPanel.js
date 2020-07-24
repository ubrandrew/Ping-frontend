import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../util/firebaseUtil";

const TransactionPanel = (props) => {
  const [activeAccount, setActiveAccount] = useState(props.activeAccount);
  const [transactions, setTransactions] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState("");

  useEffect(() => {
    async function consumeAuthPromise() {
      const authToken = await getAuthToken();
      console.log(props.actinveAccount);
      console.log(props.activeItem);
      axios
        .get(`transactions`, {
          params: {
            account_id: props.activeAccount,
            item_id: props.activeItem,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setTransactions(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    consumeAuthPromise();
    setActiveAccount(activeAccount);
  }, [activeAccount]);

  const selectTransaction = (e) => {
    setActiveTransaction(e.target.value);
  };
  return (
    <div>
      <ul>
        {transactions ? (
          transactions.map((transaction) => {
            console.log(transaction);
            return (
              <li
                value={transaction.transaction_id}
                key={transaction.transaction_id}
                onClick={selectTransaction}
              >
                {transaction.transaction_name}
              </li>
            );
          })
        ) : (
          <div>Loading accounts...</div>
        )}
      </ul>
      {activeTransaction ? (
        <div>{activeTransaction.amount}</div>
      ) : (
        <div>Select a transaction</div>
      )}
    </div>
  );
};

export default TransactionPanel;
