import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../util/firebaseUtil";
import TransactionPanel from "./TransactionPanel";

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
      .get(`accounts?item_id=${props.activeItem}`, {
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
    <div className="h-screen">
      <div>
        <div className="max-w-full h-full rounded overflow-hidden shadow-lg mr-12 mt-12 p-10">
          asdf
        </div>
      </div>

      {/* <code>{props.activeItem}</code>
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
      )} */}
    </div>
  );
};

export default FinancePanel;
