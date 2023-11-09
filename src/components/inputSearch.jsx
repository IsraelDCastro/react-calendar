import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

export default function InputSearch({ label, placeholder, options, name, getValueInput }) {
  const selectRef = useRef(null);
  const [selectedOptionName, setSelectedOptionName] = useState([]);
  const [displayList, setDisplayList] = useState(true);

  const handleSelectChange = (option) => {
    setSelectedOptionName(`{{hotels.${option.slug}.price}}`);
    getValueInput(option);
  };
  const toggleList = () => setDisplayList(!displayList);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setDisplayList(false);
      }
    });
  }, []);

  return (
    <div ref={selectRef} className="relative field">
      <label htmlFor={name} className="mb-1 text-base font-medium">
        {label}
      </label>
      <Input
        value={selectedOptionName}
        isReadOnly
        id={name}
        onClick={toggleList}
        placeholder={placeholder}
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
                  {option.name}
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

InputSearch.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired
};