import React, {useState, useEffect} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import CategorySelector from "./CategorySelector";
import AccountSelector from "./AccountSelector";
import ButtonGroup from "./ButtonGroup";
import { getAuthToken } from "../util/firebaseUtil";

const AlertFormModal = ({setAlertRerender, initialShowModal, alertID, initialCategories, initialVendorName, initialAccount, initialTopicType, initialThreshold, initialCondition, initialAlertType, initialAlertContact, initialMute }) => {
  const [showModal, setShowModal] = useState(initialShowModal);
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
        setThreshold(e.target.valueAsNumber);
    }

    const handleAccountChange = (e) => {
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
            setShowModal(false)
            setAlertRerender({})
        })
        // .catch(err => {
        //     console.log(err)
        // })
        // refresh accounts list
    }

    const postAlert = (authToken) => {
        return axios.post(`alerts`, {
            alertID,
            categories,
            vendorName,
            targetAccount,
            topicType, 
            threshold, 
            condition,
            alertType, 
            alertContact,
            mute: initialMute,
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
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"

  return (
    <>
      <button
        className="bg-blue-500 rounded-full p-2 shadow hover:shadow-lg hover:bg-blue-600 focus:outline-none"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        <svg className="w-4 h-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" /></svg>
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
           
          >
            <div className="relative w-full my-6 mx-auto max-w-4xl ">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between px-5 py-5  rounded-t">
                  <h3 className="text-xl font-semibold text-indigo-600">
                    Create/Edit Alert
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                        setAlertRerender({})
                        setShowModal(false)}}
                    type="button"
                  >
                    <span className="bg-transparent text-red-500 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6">

                  <form className="w-full max-w-screen-xl">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label htmlFor="account-selector">
                          <span className={labelStyle}>Account</span>
                          <AccountSelector 
                            id="account-selector" 
                            setValue={handleAccountChange} 
                            initialSelection={initialAccount}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label htmlFor="topic-selector">
                          <span className={labelStyle}>Topic</span>
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
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="condition-selector">
                          <span className={labelStyle}>Condition</span>
                          <ButtonGroup 
                            id="condition-selector" 
                            selections={["<", "<=", "==", ">=", ">"]} 
                            setValue={setActiveCondition}
                            initialSelection={initialCondition}
                          />
                        </label>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label htmlFor="threshold-selector">
                          <span className={labelStyle}>Amount Threshold</span>
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
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">

                        <label htmlFor="contact-selector">
                          <span className={labelStyle}>Contact</span>
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
                  </form>
                </div>
                {/* footer */}
                <div className="flex items-center justify-end p-2 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                        setAlertRerender({})
                        setShowModal(false)}}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}

AlertFormModal.defaultProps = {
    initialShowModal: false,
    alertID: "",
    initialCategories: [],
    initialVendorName: "",
    initialAccount: {},
    initialTopicType: "Category", 
    initialThreshold: 0, 
    initialCondition: "", 
    initialAlertType: "Text", 
    initialAlertContact: "",
    initialMute: false
}

AlertFormModal.propTypes = {
    initialShowModal: PropTypes.bool,
    alertID: PropTypes.string,
    initialCategories: PropTypes.arrayOf(PropTypes.object),
    initialVendorName: PropTypes.string,
    initialAccount:  PropTypes.objectOf(PropTypes.string),
    initialTopicType:  PropTypes.string,
    initialThreshold:  PropTypes.number, 
    initialCondition:  PropTypes.string, 
    initialAlertType:  PropTypes.string,
    initialAlertContact:  PropTypes.string,
    initialMute: PropTypes.bool
  };
  
export default AlertFormModal;