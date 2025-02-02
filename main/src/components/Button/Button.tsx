import { Component } from 'react';
import { ButtonProps } from '../../types/types';
import './Button.css';

class Button extends Component<ButtonProps> {
  render() {
    const { className, onClick, children } = this.props;
    return (
      <button className={className} title={this.props.title} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
