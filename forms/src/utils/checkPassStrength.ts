import {
  LOWERCASE_LETTER,
  NUMBER,
  SPECIAL_CHARACTER,
  UPPERCASE_LETTER,
} from '../constants/rules';

export const checkPassStrength = (password: string) => {
  let strength = 0;

  if (NUMBER.test(password)) strength++;
  if (UPPERCASE_LETTER.test(password)) strength++;
  if (LOWERCASE_LETTER.test(password)) strength++;
  if (SPECIAL_CHARACTER.test(password)) strength++;

  return strength;
};

export const getStrengthColor = (strength: number) => {
  switch (strength) {
    case 1:
      return 'weak';
    case 2:
      return 'medium';
    case 3:
      return 'strong';
    case 4:
      return 'very-strong';
    default:
      return '';
  }
};
