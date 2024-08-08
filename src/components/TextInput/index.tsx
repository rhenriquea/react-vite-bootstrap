import './TextInput.scss';

import React, { FC } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can define any additional props or override existing ones here
}

const TextInput: FC<TextInputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onClick,
  style,
  disabled = false,
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      className="text-input poppins-light"
      style={style}
      disabled={disabled}
      {...rest} // Spread any additional props
    />
  );
};
export default TextInput;
