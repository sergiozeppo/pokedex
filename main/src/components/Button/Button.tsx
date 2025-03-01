import { ButtonProps } from '../../types/types';
import './Button.module.css';

function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
