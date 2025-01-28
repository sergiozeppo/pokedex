import { Component } from 'react';
import { ButtonProps } from '../../types/types';

class Button extends Component<ButtonProps> {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <button className={this.props.className} onClick={this.handleClick}>
        {this.props.title}
      </button>
    );
  }
}

export default Button;
