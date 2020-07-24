import React, {useState, useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import CategorySelector from "./CategorySelector";
import AccountSelector from "./AccountSelector";
import ButtonGroup from "./ButtonGroup";
import AlertView from "./AlertView";
import { getAuthToken } from "../util/firebaseUtil";

const AlertForm = ({alertID, setEditMode, initialCategories, initialVendorName, initialAccount, initialTopicType, initialThreshold, initialCondition, initialAlertType, initialAlertContact }) => {
    const [categories, setCategories] = useState(initialCategories);
    const [vendorName, setVendorName] = useState(initialVendorName);
    const [targetAccount, setTargetAccount] = useState(initialAccount);
    const [topicType, setTopicType] = useState(initialTopicType);
    const [threshold, setThreshold] = useState(initialThreshold);
    const [condition, setCondition] = useState(initialCondition);
    const [alertType, setAlertType] = useState(initialAlertType);
    const [alertContact, setAlertContact] = useState(initialAlertContact);
   
    const setActiveTopicType = (e) => {
        setTopicType(e.target.value);
    }
    const setActiveAlertType = (e) => {
        setAlertType(e.target.value);
    }

    const setActiveCondition = (e) => {
        setCondition(e.target.value);
    }

    const handleAlertContactChange = (e) => {
        setAlertContact(e.target.value);
    }

    const handleThresholdChange = (e) => {
        console.log(e.target.valueAsNumber)
        setThreshold(e.target.valueAsNumber);
    }

    const handleAccountChange = (e) => {
        console.log(e)
        setTargetAccount(e)
    }
    const handleCategoryChange = (e) => {
        setCategories(e)
    }

    const handleVendorNameChange = (e) => {
        setVendorName(e.target.value)
    }

    const handleSave = async () => {
        const token = await getAuthToken()
        postAlert(token).then( res => {
            console.log(res)
        })
        setEditMode(false)
        // .catch(err => {
        //     console.log(err)
        // })
        // refresh accounts list
    }

    const postAlert = (authToken) => {
        console.log(typeof threshold)
        return axios.post(`alerts`, {
            alertID,
            categories,
            vendorName,
            targetAccount,
            topicType, 
            threshold, 
            condition,
            alertType, 
            alertContact
        }, {
            headers:  { Authorization: `Bearer ${authToken}` },
        })
    }

    const renderTargetSelector = () => {
        switch (topicType) {  
            case "Name":
                return (
                  <input 
                    value={vendorName} 
                    onChange={handleVendorNameChange} 
                    type="text" 
                    placeholder="Enter name" 
                    className="w-full p-2 border rounded-md border-gray-400 focus:outline-none"
                  />
                )
            case "All":
                return (
                  <input 
                    key="test"
                    type="text" 
                    placeholder="All transactions" 
                    className="w-full p-2 rounded-md bg-purple-100 focus:outline-none" 
                    disabled
                  />
                );
            case "Category":
                return <CategorySelector setValue={handleCategoryChange} initialSelection={initialCategories} />
            default:
                return <div>Select a topic type</div>
        }
    }

    return (
      <div>
        <AlertView 
          categories={categories}
          vendorName={vendorName}
          account={targetAccount}
          topicType={topicType}
          threshold={threshold}
          condition={condition}
          alertType={alertType}
          alertContact={alertContact}
        />
        <div>
          <div className="max-w-xl py-3 px-3">
            <label htmlFor="account-selector">
              <span className="block uppercase tracking-wide text-indigo-600 text-lg font-bold mb-3">Account</span>
              <AccountSelector 
                id="account-selector" 
                setValue={handleAccountChange} 
                initialSelection={initialAccount}
              />
            </label>
          </div>

          <div className="max-w-xl py-3 px-3">
            <label htmlFor="topic-selector">
              <span className="block uppercase tracking-wide text-indigo-600  text-lg font-bold mb-3">Topic</span>
              <div id="topic-selector">
                <div className="pb-3">
                  <ButtonGroup 
                    selections={["Category", "Name", "All"]} 
                    setValue={setActiveTopicType} 
                    initialSelection={topicType}
                  />

                </div>
                <div className="">
                  {renderTargetSelector()}
                </div>
              </div>
            </label>
          </div>
          <div className="max-w-xl py-3 px-3">
            <label htmlFor="condition-selector">
              <span className="block uppercase tracking-wide text-indigo-600  text-lg font-bold mb-3">Condition</span>
              <ButtonGroup 
                id="condition-selector" 
                selections={["<", "<=", "==", ">=", ">"]} 
                setValue={setActiveCondition}
                initialSelection={initialCondition}
              />
            </label>
          </div>
          <div className="max-w-xl py-3 px-3">
            <label htmlFor="threshold-selector">
              <span className="block uppercase tracking-wide text-indigo-600 text-lg font-bold mb-3">Amount Threshold</span>
              <div className="flex">
                <span 
                  className="rounded-l-md p-2 self-center border-l border-t border-b bg-gray-200 outline-none"
                >
                  $
                </span>
                <input 
                  value={threshold} 
                  onChange={handleThresholdChange} 
                  key="amount"
                  id="threshold-selector" 
                  type="number" 
                  className="border border-gray-400 p-2 rounded-r-md w-full focus:outline-none" 
                  placeholder="Enter dollar amount threshold"
                />
              </div>
            </label>
          </div>

          <div className="max-w-xl py-3 px-3">
            <label htmlFor="contact-selector">
              <span className="block uppercase tracking-wide text-indigo-600  text-lg font-bold mb-3">Contact</span>
              <ButtonGroup 
                className="mb-3" 
                id="contact-selector" 
                selections={["Text", "Email", "Webhook"]} 
                setValue={setActiveAlertType} 
                initialSelection={alertType}
              />
              <input 
                value={alertContact} 
                onChange={handleAlertContactChange} 
                type="text" 
                className="w-full my-2 p-2 border border-gray-400 rounded-md focus:outline-none" 
                placeholder="enter contact"
              />
            </label>
          </div>

        </div>
        <div className="inline-block">
          <button onClick={handleSave} type="button" className=" bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-lg text-s mx-1">
            Save
          </button>
          <button onClick={() => {setEditMode(false)}} type="button" className=" bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-lg text-s mx-1">
            Cancel
          </button>
        </div>
      </div>
    )
}

AlertForm.defaultProps = {
    alertID: "",
    initialCategories: [],
    initialVendorName: "",
    initialAccount: "",
    initialTopicType: "Category", 
    initialThreshold: 0, 
    initialCondition: "", 
    initialAlertType: "Text", 
    initialAlertContact: ""
}

AlertForm.propTypes = {
    alertID: PropTypes.string,
    initialCategories: PropTypes.arrayOf(PropTypes.object),
    initialVendorName: PropTypes.string,
    initialAccount:  PropTypes.string,
    initialTopicType:  PropTypes.string,
    initialThreshold:  PropTypes.number, 
    initialCondition:  PropTypes.string, 
    initialAlertType:  PropTypes.string,
    initialAlertContact:  PropTypes.string,
  };
  

export default AlertForm;