import React, { useState, useEffect } from "react";
import "./CategoryOption.css";
import arrow from "../static/chevron.svg";

const Option = ({ level, data, ...props }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const rightChevron = <svg className="w-5 h-5 fill-current text-gray-600 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg> 
  const downChevron = <svg className="w-5 h-5 fill-current text-gray-600 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
  useEffect(() => {}, []);

  const selectOption = () => {
    const {children, ...rest} = data
    props.selectOption(rest)
  }
  return (
    <div>
      <div
        style={{
          paddingLeft: `${level * 40}px`,
        }}
        className="py-3 hover:bg-purple-100 flex justify-left items-center"
      >
        {data.children && data.children.length > 0 ? (
          <span className="text-lg p-2" onClick={toggleVisible} onKeyPress={toggleVisible} role="button" tabIndex="0">
            {visible ? downChevron : rightChevron}
          </span>
        ) : (
          <span className="text-lg p-2 invisible" onClick={toggleVisible} onKeyPress={toggleVisible} role="button" tabIndex="0">
            {visible ? downChevron : rightChevron}
          </span>
        )}
        <div
          className="inline-block"
          onClick={selectOption}
          onKeyPress={selectOption}
          role="button"
          tabIndex="0"
        >
          {data.label}
        </div>
      </div>
      {visible &&
          data.children &&
          data.children.length > 0 &&
          data.children.map((child) => {
            return <Option data={child} level={level + 1} {...props} />;
          })}
    </div>
  );
};

export default Option;
