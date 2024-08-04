import { useField } from 'formik';
import React from 'react';

const SelectField = ({ name, data, label }) => {
      const [field, meta] = useField(name);

      return (
            <div className="mt-2">
                  <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700">
                        {label}
                  </label>
                  <select
                        id={name}
                        {...field}
                        className="bg-white mt-2 block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                  >
                        {data.map((item) => (
                              <option key={item} value={item}>
                                    {item}
                              </option>
                        ))}
                  </select>
                  {meta.touched && meta.error ? (
                        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
                  ) : null}
            </div>
      );
};

export default SelectField;
