import React from 'react';

interface SelectFieldProps {
  id: string;
  listOptions: { value: string; option: string }[];
  defaultOption: string;
  children: React.ReactNode;
  onChange?: (e: string) => void;
}

function SelectField({
  id,
  listOptions,
  defaultOption,
  children,
  onChange = () => {},
}: SelectFieldProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  if (listOptions.length === 0) return null;

  return (
    <fieldset className={`fieldset fieldset-${id}`}>
      <label htmlFor={id} className="label">
        <span className="label-text">{children}</span>
      </label>

      <select
        id={id}
        className="select"
        value={defaultOption}
        onChange={handleOnChange}
      >
        {listOptions.map(({ value, option }) => {
          return (
            <option key={value} value={value} className="select-option">
              {option}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
}

export default SelectField;
