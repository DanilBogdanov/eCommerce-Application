import {
  passwordValidationRules,
  nameValidationRules,
  surnameValidationRules,
  birthdateValidationRules,
  streetValidationRules,
  cityValidationRules,
  countryValidationRules,
  postcodeValidationRules,
  descValidationRules,
  numValidationRules,
  emailValidationRules,
  loginPasswordValidationRules,
} from './validationRules';

export const nameElementParams = {
  name: 'name',
  label: 'name',
  type: 'text',
  id: 'name',
  placeholder: 'write your name ...',
  validation: {
    ...nameValidationRules,
  },
};

export const surnameElementParams = {
  name: 'surnam',
  label: 'surname',
  type: 'text',
  id: 'surnam',
  placeholder: 'write your surname ...',
  validation: {
    ...surnameValidationRules,
  },
};

export const birthdateElementParams = {
  name: 'birthdate',
  label: 'birthdate',
  type: 'date',
  id: 'birthdate',
  placeholder: 'write your date of birth ...',
  validation: {
    ...birthdateValidationRules,
  },
};

export const streetBillingElementParams = {
  name: 'streetBilling',
  label: 'street',
  type: 'text',
  id: 'streetBilling',
  placeholder: 'write your street ...',
  validation: {
    ...streetValidationRules,
  },
};

export const cityBillingElementParams = {
  name: 'cityBilling',
  label: 'city',
  type: 'text',
  id: 'cityBilling',
  placeholder: 'write your city ...',
  validation: {
    ...cityValidationRules,
  },
};

export const countryBillingElementParams = {
  name: 'countryBilling',
  label: 'country',
  type: 'select',
  id: 'countryBilling',
  placeholder: 'write your country ...',
  validation: {
    ...countryValidationRules,
  },
};

export const postcodeBillingElementParams = {
  name: 'postcodeBilling',
  label: 'postcode',
  type: 'text',
  id: 'postcodeBilling',
  placeholder: 'write your postcode ...',
  validation: {
    ...postcodeValidationRules,
  },
};

export const descElementParams = {
  name: 'description',
  label: 'description',
  type: 'text',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    ...descValidationRules,
  },
};

export const passwordElementParams = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    ...passwordValidationRules,
  },
};

export const loginPasswordElementParams = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    ...loginPasswordValidationRules,
  },
};

export const numElementParams = {
  name: 'num',
  label: 'number',
  type: 'number',
  id: 'num',
  placeholder: 'write a number ...',
  validation: {
    ...numValidationRules,
  },
};

export const emailElementParams = {
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'write an email address ...',
  validation: {
    ...emailValidationRules,
  },
};

export const streetShippingElementParams = {
  name: 'streetShipping',
  label: 'street',
  type: 'text',
  id: 'streetShipping',
  placeholder: 'write your street ...',
  validation: {
    ...streetValidationRules,
  },
};

export const cityShippingElementParams = {
  name: 'cityShipping',
  label: 'city',
  type: 'text',
  id: 'cityShipping',
  placeholder: 'write your city ...',
  validation: {
    ...cityValidationRules,
  },
};

export const countryShippingElementParams = {
  name: 'countryShipping',
  label: 'country',
  type: 'select',
  id: 'countryShipping',
  placeholder: 'write your country ...',
  validation: {
    ...countryValidationRules,
  },
};

export const postcodeShippingElementParams = {
  name: 'postcodeShipping',
  label: 'postcode',
  type: 'text',
  id: 'postcodeShipping',
  placeholder: 'write your postcode ...',
  validation: {
    ...postcodeValidationRules,
  },
};

export const sameAddressCheckboxParams = {
  name: 'SameAddress',
  type: 'checkbox',
  id: 'checkboxSameAddress',
};
export const defaultBillingCheckboxParams = {
  name: 'DefaultBilling',
  type: 'checkbox',
  id: 'checkboxBillingDefault',
};
export const defaultShippingCheckboxParams = {
  name: 'DefaultShipping',
  type: 'checkbox',
  id: 'checkboxShipingDefault',
};
export const sameAddressLabelParams = {
  name: 'Use same address as for billing',
  htmlFor: 'checkboxSameAddress',
};
export const defaultBillingLabelParams = {
  name: 'Make address default for billing',
  htmlFor: 'checkboxBillingDefault',
};
export const defaultShippingLabelParams = {
  name: 'Make address default for shipping',
  htmlFor: 'checkboxShipingDefault',
};
