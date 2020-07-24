import React, { useState } from "react";
import PropType from "prop-types";
import "./SelectDropdown.css";

const SelectDropdown = ({ label, options, setOption }) => {
  return (
    <>
      <div className="inline-block pr-2">{label}</div>
      <select
        className="bank-item-selector block appearance-none w-4/12 border border-gray-500 py-3 px-4 pr-8 rounded inline-block "
        onChange={(e) => setOption(e.target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option.item_id} value={option.item_id}>
              {option.display_name}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </>
  );
};

SelectDropdown.defaultProps = {
  options: [],
  label: "",
};

SelectDropdown.propTypes = {
  label: PropType.string,
  options: PropType.arrayOf(PropType.object),
  setOption: PropType.func.isRequired,
};

export default SelectDropdown;
