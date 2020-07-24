import React from "react";
import webhookIcon from "../assets/icons8-webhook.svg";
import messageIcon from "../assets/message.svg";
import emailIcon from "../assets/envelope.svg";

const AlertView = ({categories, vendorName, topicType, threshold, condition, alertType, alertContact}) => {
    const renderTopic = () => {
        switch (topicType){
            case "Category":
                return (
                  <>
                    Spending in 
                    {' '}
                    {categories ? categories.map((currVal, index) => {
                        return (
                          <span key={currVal.value} className={importantTextStyle}>
                            {currVal.label}
                          </span>
                        )

                      }, "")
                    :
                    "no categories selected"}
                  </>
                )
            case "Name":
                return (
                  <>
                    Spending at 
                    {' '}
                    <span className={importantTextStyle}>
                      {vendorName}
                    </span>
                  </>
                  )
            default:
                return (
                  <span className={importantTextStyle}>
                    Total spending
                  </span>
                )
        }
    }

    const renderContact = () => {
        switch (alertType) {
            case "Webhook":
                return (
                  <> 
                    <img src={webhookIcon} className="h-6 w-6 mr-2 " alt="webhook" />
                    {alertContact}
                  </>
                )
            case "Email":
                return (
                  <>
                    <img src={emailIcon} className="h-6 w-6 mr-2" alt="email" />
                    {alertContact}
                  </>
                  )
                
            case "Text":
                return (
                  <>
                    <img src={messageIcon} className="h-6 w-6 mr-2" alt="text" />
                    {alertContact}
                  </>
                  )
            default:
                return ""
        }
    }

    const importantTextStyle = "inline-block flex-wrap border border-gray-400  rounded-lg px-1 text-indigo-400 mx-1 mb-2"
    const labelTextStyle = "flex-none py-1 px-2 font-semibold mr-2 self-start w-40"
    return (
      <div> 
        <div className="flex align-top">
          <span className={labelTextStyle}>
            Trigger Condition:
          </span>
          <div className="bg-gray-100 text-gray-700 rounded-md pt-2 pb-1 px-2 w-full">
            {renderTopic()}
            {' '}
            is 
            {' '}
            <span className={importantTextStyle}>{condition}</span> 
            {' '}
            <span className={importantTextStyle}>
              $
              {threshold.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="pt-3 flex items-center">
          <div className={labelTextStyle}>
            Contact Information:
          </div>
          <span className="bg-gray-100 rounded-md pt-2 pb-1 px-2 w-full">
            <div className="flex text-gray-700">
              {renderContact()}
            </div>
          </span>
        </div>
      </div>
    )
}

export default AlertView;