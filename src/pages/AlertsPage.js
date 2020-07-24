import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../util/firebaseUtil";

import Alert from "../components/Alert";

const AlertsPage = (props) => {
    const sample = {
        "categories": [],
        "vendorName": "",
        "targetAccount": {
            label: "",
            value: ""
        },
        "threshold": 0,
        "condition": "",
        "topicType": "",
        "alertType": "",
        "alertContact": "",
        "initialEditMode": true        
    }

    const [alerts, setAlerts] = useState([]);
    const [alertRerender, setAlertRerender] = useState({});

    const getAlerts = (authToken) => {
        axios.get("alerts", {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(res => {
            setAlerts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        console.log("Rerendered alert page")
        async function consumeAuthPromise() {
            const authToken = await getAuthToken();
            getAlerts(authToken)
            console.log("got new alerts")

          }
          consumeAuthPromise();

    }, [alertRerender])

  return (
    <div>
      <div className="flex">
        <div className="flex-grow">
          <h1 className="font-bold text-3xl mb-2 text-gray-700">Your Bank Alerts</h1>
          <p>Add custom notifications to your bank accounts</p>
        </div>
        <div className="justify-end self-center">
          <button onClick={() => setAlerts(alerts.concat([sample]))} type="button" className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded flex">
            <svg className="h-4 w-4 mr-2 self-center justify-center fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" /></svg>
            Add a new alert
          </button>
        </div>
      </div>
      {alerts.map(alert => {
          return (
            <Alert 
              key={alert.alertID}
              alertID={alert.alertID}
              categories={alert.categories}
              account={alert.targetAccount}
              topicType={alert.topicType}
              threshold={alert.threshold}
              condition={alert.condition}
              alertType={alert.alertType}
              alertContact={alert.alertContact}
              vendorName={alert.vendorName}
              initialEditMode={alert.initialEditMode ? alert.initialEditMode : false}
              initialMute={alert.mute}
              setAlertRerender={setAlertRerender}
            />
          )
      })}
      
    </div>
  ) 
}

export default AlertsPage;
