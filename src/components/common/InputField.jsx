import { useField, useFormikContext } from 'formik';
import React from 'react';

const InputField = ({ label, name, type = "text", placeholder, accept }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    if (type === 'file') {
      setFieldValue(name, event.currentTarget.files[0]); // Handle file input
    } else {
      field.onChange(event); // Handle other input types
    }
  };

  return (
    <div className="mt-2">
      <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...field}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        accept={accept}
        onChange={handleChange} // Use handleChange for all inputs
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
        value={type === 'file' ? undefined : field.value} // Prevent value setting for file inputs
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
