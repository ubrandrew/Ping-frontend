import React, {useState} from "react";
import axios from "axios";
import { getAuthToken } from "../util/firebaseUtil";

const MuteButton = ({muteStatus, handleMuteStatus, alertID}) => {
    return (
      <>
        {muteStatus ? (
          
          <button onClick={handleMuteStatus} type="button" className="mx-2 bg-gray-500 rounded-full p-2 shadow hover:shadow-lg hover:bg-gray-600 focus:outline-none">
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8v7h8V8a4 4 0 1 0-8 0zm2.03-5.67a2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8a6 6 0 0 1 4.03-5.67zM12 18a2 2 0 1 1-4 0h4z" />
              <line style={{stroke: "rgb(255, 255, 255)", strokeWidth: "2px"}} x1="2.868" y1="19.341" x2="16.984314671334204" y2="1.8083563248402394" />
            </svg>
          </button>
           
           )
           
             : (
               <button onClick={handleMuteStatus} type="button" className="mx-2 bg-green-500 rounded-full p-2 shadow hover:shadow-lg hover:bg-green-600 focus:outline-none">
                 <svg className="w-4 h-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 8v7h8V8a4 4 0 1 0-8 0zm2.03-5.67a2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8a6 6 0 0 1 4.03-5.67zM12 18a2 2 0 1 1-4 0h4z" /></svg>
               </button>
           )}
      </>
    )
}

export default MuteButton;