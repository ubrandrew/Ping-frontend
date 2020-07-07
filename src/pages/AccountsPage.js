import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/auth";
import { getAuthToken } from "../util/firebaseUtil";
import FinancePanel from "../components/FinancePanel";
import SelectDropdown from "../components/SelectDropdown";

const AccountsPage = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    async function consumeAuthPromise() {
      const authToken = await getAuthToken();

      axios
        .get(`http://localhost:8000/bank_items`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          const test = res.data;
          setAccounts(test);
          console.log(test);
          setActiveItem(test[0].item_id);
          console.log(accounts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    consumeAuthPromise();
    console.log(activeItem);
  }, []);

  return (
    <div>
      <SelectDropdown
        label="Bank Institution: "
        options={accounts}
        setOption={setActiveItem}
      />
      {activeItem !== "" ? (
        <FinancePanel key={activeItem} activeItem={activeItem} />
      ) : (
        <div>You have no bank items added. Add a bank account </div>
      )}
      {/* Every account gets a list element */}
      {/* By defualt, the first transaction is expanded  */}
    </div>
  );
};

export default AccountsPage;
