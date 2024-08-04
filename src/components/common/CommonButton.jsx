import React from 'react';

const CommonButton = ({ label, isValid, dirty, disabled, ...props }) => {
    return (
        <button
            type="submit"
            disabled={disabled || !isValid || !dirty}
            className={`inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            {...props}
        >
            {label}
        </button>
    );
};

export default CommonButton;
