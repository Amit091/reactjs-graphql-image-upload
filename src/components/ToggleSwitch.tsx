import React, { useState } from 'react';

interface ToggleSwitchProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialChecked = false,
  onChange,
}) => {
  const [isMultiple, setIsMultiple] = useState(initialChecked);

  const handleToggle = () => {
    setIsMultiple((prev) => {
      const newChecked = !prev;
      if (onChange) {
        onChange(newChecked);
      }
      return newChecked;
    });
  };

  return (
    <div className="flex items-center">
      <span className={`mr-2 ${!isMultiple ? 'text-green-500' : 'text-gray-500'}`}>
        Single
      </span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${
          isMultiple ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute left-0 inline-block w-5 h-5 transform transition-transform duration-200 ease-in-out ${
            isMultiple ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'
          } rounded-full`}
        />
      </button>
      <span className={`ml-2 ${isMultiple ? 'text-green-500' : 'text-gray-500'}`}>
        Multiple
      </span>
    </div>
  );
};

export default ToggleSwitch;
