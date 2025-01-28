import { Component } from 'react';
import { ButtonProps } from '../../types/types';

class Button extends Component<ButtonProps> {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <button
        className={this.props.className}
        title={this.props.title}
        onClick={this.handleClick}
      />
    );
  }
}

export default Button;
