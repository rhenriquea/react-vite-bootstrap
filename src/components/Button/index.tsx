import './Button.scss';

import React, { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, onClick, ...rest }) => (
  <>
    <button id="wawbutton" onClick={onClick} {...rest}>
      {children}
    </button>
  </>
);

export default Button;
