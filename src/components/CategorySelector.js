import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Option from "./CategoryOption";

const CategorySelector = ({ setValue, initialSelection }) => {
  const [categoryTree, setCategoryTree] = useState([]);

  const handleCategoryChange = (e) => {
    setValue(e);
  };

  useEffect(() => {
    axios
      .get(`categories`)
      .then((res) => {
        setCategoryTree(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const colourStyles = {
    multiValueLabel: (styles) => ({
        ...styles,
        backgroundColor: "#c3dafe",
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        backgroundColor:"#c3dafe",
        ':hover': {
          color: 'red',
        },
      }),
  }
  return (
    <div>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={initialSelection}
        className="basic-multi-select"
        components={{
          Option: (optionsProps) => <Option {...optionsProps} level={0} />,
        }}
        options={categoryTree}
        onChange={handleCategoryChange}
        styles={colourStyles}
      />
    </div>
  );
};

export default CategorySelector;
