import React, { useState, useEffect } from "react";
import { getAuthToken } from "../util/firebaseUtil";
import TransactionPanel from "./TransactionPanel";
import axios from "axios";

const FinancePanel = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState("");

  useEffect(() => {
    getAccounts();
  }, [props.activeItem]);

  const getAccounts = async () => {
    const authToken = await getAuthToken();
    console.log(props.activeAccount);
    console.log(props.activeItem);
    axios
      .get(`http://localhost:8000/accounts?item_id=${props.activeItem}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setAccounts(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectAccount = (e) => {
    const test = e.target.value;
    setActiveAccount(test);
    console.log(test);
  };

  return (
    <div>
      <code>{props.activeItem}</code>
      <ul>
        {accounts ? (
          accounts.map((account) => {
            return (
              <li key={account["account_id"]}>
                <button value={account["account_id"]} onClick={selectAccount}>
                  {account["short_name"]}
                </button>
              </li>
            );
          })
        ) : (
          <div>Loading accounts...</div>
        )}
      </ul>

      {activeAccount != "" ? (
        <TransactionPanel
          key={activeAccount}
          activeAccount={activeAccount}
          activeItem={props.activeItem}
        />
      ) : (
        <div>Select an account to view transactions</div>
      )}
    </div>
  );
};

export default FinancePanel;
