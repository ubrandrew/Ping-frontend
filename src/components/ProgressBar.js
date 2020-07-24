import React from "react";

const ProgressBar = ({ completed, max } ) => {
    const determineColor = () => {
        const pct = Math.floor(100*completed/max);
        if (pct < 50) {
            return "green"
        } 
        if (pct < 80) {
            return "yellow"
        } 
        return "red"
    }
  
    const fillerStyles = {
      width: `${ Math.floor(100*completed/max) > 100 ? 100 : Math.floor(100*completed/max)}%`,
      transition: 'width 1s ease-in-out'
    }

  
    return (
      <div className="flex mr-2 w-full min-w-0 h-4 items-center">
        <div className="w-auto text-left mr-8">
          <span className={`text-${determineColor()}-400 font-bold text-2xl`}>
            $
            {completed.toFixed(2)}
          </span>
          <span className="font-bold text-gray-500 ml-2 text-2xl">
            /
          </span>
          <span className="font-bold text-gray-500 ml-1 ">
            {max.toFixed(2)}
          </span>
        </div>

        <div className="w-10/12 bg-gray-300 rounded-full h-4 mr-8 ">
          <div className={`rounded-full h-full bg-${determineColor()}-400`} style={fillerStyles} />
        </div>
      </div>
    );
  };
  
  export default ProgressBar;