import { Country } from '../../types/api';

const countryOptions: { value: Country | string; text: string }[] = [
  { value: '', text: '--Choose country--' },
  { value: Country.RUSSIA, text: 'RUSSIA' },
  { value: Country.UKRAINE, text: 'UKRAINE' },
  { value: Country.BELARUS, text: 'BELARUS' },
  { value: Country.USA, text: 'USA' },
  { value: Country.AUSTRALIA, text: 'AUSTRALIA' },
];

export default countryOptions;
