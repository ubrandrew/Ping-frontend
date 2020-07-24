import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAuthToken } from "../util/firebaseUtil";

const AccountSelector = ({setValue, initialSelection}) => {
  const [bankItems, setBankItems] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const handleAccountChange = (e) => {
    setValue(e)
  }


  const getBankItemsAndAccounts = async (authToken) =>{
    axios.get(`bank_items`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(async (res) => {
            setBankItems(res.data)
            const result = []
            for (const item of res.data) {
               result.push( getAccountsForBankItem(authToken, item.item_id));
            }
            return Promise.all(result)
        })
      .then((res) => {
          const accountData = []
          res.forEach(elem => {
            accountData.push(elem.data)
          })
        setAccounts(accountData)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getAccountsForBankItem = (authToken, bankItemID) => {
    return axios.get(`accounts`, {
        params: {item_id: bankItemID},
        headers: { Authorization: `Bearer ${authToken}` },
      })
  }

  useEffect(() => {
    async function consumeAuthPromise() {
        const authToken = await getAuthToken();
        getBankItemsAndAccounts(authToken)
      }
      consumeAuthPromise();
  }, []);

  // TODO: CHECK THAT BANKITEMS AND ACCOUNTS ARE SYNCED (in terms of array index)
  const formattedAccountList = () => {
      const selectList = [];
      accounts.forEach((item, i) => {
          const itemObj = {label: bankItems[i].display_name, options: []}
          item.forEach(account => {
            itemObj.options.push({
                label: account.short_name,
                value: account.account_id,
                bankItemID: account.bank_item_id,
                institution: bankItems[i].institution,
                institutionID: bankItems[i].institutionID,
                mask: account.mask
            })
          })
          selectList.push(itemObj)
      })
      return selectList;
  }

  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  
  const formatGroupLabel = data => (
    <div className="flex items-center justify-between py-2">
      <span className="text-indigo-500 text-lg font-semibold">{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  return (
    <div>
      <Select
        closeMenuOnSelect
        className="basic-multi-select"
        defaultValue={initialSelection}
        formatGroupLabel={formatGroupLabel}
        options={formattedAccountList()}
        onChange={handleAccountChange}
      />
    </div>
  );
};

export default AccountSelector;
