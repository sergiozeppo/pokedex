import { ChangeEvent } from 'react';

export type ButtonProps = {
  className: string;
  title: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export type SearchBarProps = {
  className: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
