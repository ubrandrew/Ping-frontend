import React, { useState, useEffect } from "react";
import PropType from "prop-types";
import axios from "axios";
import AlertFormModal from "./AlertFormModal";
import AlertView from "./AlertView";
import MuteButton from "./MuteButton";
import LogoImage from "./LogoImage";
import ProgressBar from  "./ProgressBar";
import { getAuthToken } from "../util/firebaseUtil";


const Alert = ({setAlertRerender, alertID, categories, account, vendorName, threshold, condition, topicType, alertType, alertContact, initialEditMode, initialMute}) => {
    const [imageData, setImageData] = useState();
    const [muteStatus, setMuteStatus] = useState(initialMute);
    const handleDelete = async () => {
        const authToken = await getAuthToken();
        axios.delete("alerts", {
            params: { alert_id: alertID },
            headers: { Authorization: `Bearer ${authToken}` },
        }).then( () => {
            setAlertRerender([])
        })
    }
    const handleMuteStatus = async () => {
        // send request to server with alertID and !muteStatus
        const authToken = await getAuthToken();
        axios.post("/alerts/mute", 
            {
                alertID,
                muteStatus: !muteStatus
            }, 
            { headers: { Authorization: `Bearer ${authToken}` },
        }).then( res => {
            setMuteStatus(!muteStatus);
        }).catch(err => {
            console.log(err)
        })
    }

    const calculateSum = () => {
        let sum = 0;
        for (const cat of categories) {
            sum += parseFloat(cat.count)
        }
        return sum
    }

    useEffect(() => {
        axios.get("/institutions", {
            params: {
                institutionID: account.institutionID,
                imageOnly: "true",
            }
        }).then(res => {
            setImageData(res.data)
        })
    }, [])
  return (
    <div className="mx-3 px-4 py-5 my-4 bg-white shadow-lg rounded-lg ">
      <div className="w-full flex  pb-6">
        {imageData ? <LogoImage data={imageData} /> : ""}
        <div className="inline-block self-center flex-grow">
          <div className="font-semibold text-lg text-gray-700">
            {account.label}         
            {' '}
            <span className="font-normal text-gray-500 text-sm">ending in</span>
            <span className="mt-3 bg-gray-200 rounded-md mx-2 p-1 text-indigo-500 font-normal self-start tracking-wider">{account.mask}</span>
          </div>
          <div className="font-semibold text-gray-500 text-md">{account.institution}</div>
        </div>

        <div className="justify-end mt-5">
          <MuteButton className="mx-2 inline-block" muteStatus={muteStatus} alertID={alertID} handleMuteStatus={handleMuteStatus} />
          <AlertFormModal
            className="inline-block"
            setAlertRerender={setAlertRerender}
            initialShowModal={initialEditMode}
            alertID={alertID} 
            initialCategories={categories}
            initialAccount={account}
            initialTopicType={topicType}
            initialVendorName={vendorName}
            initialThreshold={threshold}
            initialCondition={condition}
            initialAlertType={alertType}
            initialAlertContact={alertContact}
            initialMute={muteStatus}
          />
          <button onClick={handleDelete} type="button" className="mx-2 bg-red-500 rounded-full p-2 shadow hover:shadow-lg hover:bg-red-600 focus:outline-none">
            <svg className="w-4 h-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z" /></svg>
          </button>
        </div>
      </div>
      <div className="font-normal text-gray-600 text-sm mx-3 mb-4">
        <AlertView 
          categories={categories}
          topicType={topicType}
          vendorName={vendorName}
          threshold={threshold}
          condition={condition}
          alertType={alertType}
          alertContact={alertContact}
        />  
      </div>
      <div className="h-8 p-6">
        <ProgressBar completed={calculateSum()} max={threshold} />
      </div>
    </div>
  );
};

// Alert.defaultProps = {
//     threshold: 0,
//     condition: "==",
//     targetType: "all",
//     target: "",
//     alertType: "webhook",
//     alertContact: ""
// } 


// Alert.propTypes = {
//     initialCategories: PropTypes.arrayOf(PropTypes.object),
//     initialVendorName: PropTypes.string,
//     initialAccount:  PropTypes.string,
//     initialTopicType:  PropTypes.string,
//     initialThreshold:  PropTypes.number, 
//     initialCondition:  PropTypes.string, 
//     initialAlertType:  PropTypes.string,
//     initialAlertContact:  PropTypes.string,
// }
export default Alert;
