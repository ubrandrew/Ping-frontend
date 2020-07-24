import React, {useState} from "react";

const ButtonGroup = ({selections, initialSelection, setValue}) => {
    const inactiveButtonStyle = "focus:outline-none bg-gray-200 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-3 lock uppercase tracking-wide text-gray-700 text-xs font-bold";
    const activeButtonStyle = "focus:outline-none bg-indigo-200 hover:bg-indigo-300 text-gray-700 font-semibold py-2 px-3 lock uppercase tracking-wide text-gray-700 text-xs font-bold";
    const [selection, setSelection] = useState(initialSelection)

    const updateValue = (e) => {
        setValue(e)
        setSelection(e.target.value)
    }


    return (
      <div>
        {selections.map((elem, i) => {
          return (
            <button 
              key={elem}
              onClick={updateValue} 
              value={elem} 
              type="button" 
              className={`${elem===selection ? activeButtonStyle : inactiveButtonStyle  } ${i===0 ? "rounded-l":""} ${i===selections.length-1?"rounded-r":""}`}
            >
              {elem}
            </button>
          )
          })}
      </div>
      
    )
}

export default ButtonGroup;