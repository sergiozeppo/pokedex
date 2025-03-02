import { ButtonProps } from '../../types/types';

function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
