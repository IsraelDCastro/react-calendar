import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

export default function SelectMultiple({ label, placeholder, options, dataFormik, name, values, isMultiple }) {
  const selectRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionNames, setSelectedOptionNames] = useState([]);
  const [displayList, setDisplayList] = useState(false);
  const checkIfExist = (value) => {
    if (isMultiple && Array.isArray(selectedOptions)) {
      return selectedOptions.includes(value);
    }
    return value === selectedOptions;
  };

  const handleSelectChange = (option) => {
    const names = option?.full_name || option.name;
    if (isMultiple) {
      if (checkIfExist(option.id)) {
        setSelectedOptions((prevState) => prevState.filter((id) => id !== option.id));
        setSelectedOptionNames((prevState) => prevState.filter((name) => name !== names));
        return;
      }
      setSelectedOptionNames((prevState) => [...prevState, names]);
      setSelectedOptions((prevState) => [...prevState, option.id]);
      return;
    }

    setSelectedOptionNames(names);
    setSelectedOptions(option.id);
  };
  const toggleList = () => setDisplayList(!displayList);

  useEffect(() => {
    dataFormik.setFieldValue(name, selectedOptions);
  }, [displayList]);

  useEffect(() => {
    if (Array.isArray(options) && Array.isArray(values)) {
      const displayNames = values.map((valueId) => {
        const matchingOption = options.find((option) => option.id === Number(valueId));
        const names = matchingOption?.full_name || matchingOption?.name;
        return matchingOption ? names : "";
      });
      setSelectedOptionNames(displayNames);
    }
    const numberValues = Array.isArray(values) && values.map((value) => Number(value));
    setSelectedOptions(numberValues || []);
  }, [values, options]);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setDisplayList(false);
      }
    });
  }, []);

  useEffect(() => {
    setSelectedOptions([]);
    setSelectedOptionNames([]);
  }, [isMultiple]);
  return (
    <div ref={selectRef} className="relative field">
      <label htmlFor={name} className="mb-1 text-base font-medium">
        {label}
      </label>
      <Input
        value={
          isMultiple && Array.isArray(selectedOptionNames)
            ? selectedOptionNames.join(", ")
            : selectedOptionNames
        }
        isReadOnly
        id={name}
        onClick={toggleList}
        placeholder={placeholder}
        color={
          dataFormik.touched[name] && dataFormik.errors[name] ? "danger" : ""
        }
        errorMessage={
          dataFormik.touched[name] &&
          dataFormik.errors[name] &&
          dataFormik.errors[name]
        }
      />
      <AnimatePresence>
        {displayList && (
          <motion.ul
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-40 w-full h-48 p-5 mt-2 overflow-y-auto bg-white rounded-lg shadow vertical-scroll"
          >
            {Array.isArray(options) &&
              options.map((option) => (
                <li
                  role="button"
                  tabIndex={-1}
                  className="flex justify-between px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-200"
                  key={option.id}
                  onClick={() => handleSelectChange(option)}
                >
                  {option?.full_name || option.name}{" "}
                  {checkIfExist(option.id) && <i className="fa-solid fa-check" />}
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <select
        name={name}
        hidden
        multiple
        value={selectedOptions}
        onChange={dataFormik.handleChange}
      >
        {Array.isArray(options) &&
          options.map((option, index) => (
            <option key={index} value={option.id}>
              {option?.full_name || option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

SelectMultiple.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFormik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool,
};