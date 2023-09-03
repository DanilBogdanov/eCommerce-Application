import {
  passwordValidationRules,
  nameValidationRules,
  surnameValidationRules,
  birthdateValidationRules,
  addressValidationRules,
  cityValidationRules,
  countryValidationRules,
  postcodeValidationRules,
  descValidationRules,
  numValidationRules,
  emailValidationRules,
} from './validationRules';

export const nameElementParams = {
  className: 'InputForm',
  name: 'name',
  label: 'Name:',
  type: 'text',
  id: 'name',
  placeholder: 'write your name ...',
  validation: {
    ...nameValidationRules,
  },
};

export const surnameElementParams = {
  className: 'InputForm',
  name: 'surnam',
  label: 'Surname:',
  type: 'text',
  id: 'surnam',
  placeholder: 'write your surname ...',
  validation: {
    ...surnameValidationRules,
  },
};

export const birthdateElementParams = {
  className: 'InputForm',
  name: 'dateOfBirth',
  label: 'Birthdate:',
  type: 'date',
  id: 'birthdate',
  placeholder: 'write your date of birth ...',
  validation: {
    ...birthdateValidationRules,
  },
};

export const addressBillingElementParams = {
  className: 'InputForm',
  name: 'streetBilling',
  label: 'Address:',
  type: 'text',
  id: 'streetBilling',
  placeholder: 'write your street ...',
  validation: {
    ...addressValidationRules,
  },
};

export const cityBillingElementParams = {
  className: 'InputForm',
  name: 'cityBilling',
  label: 'City:',
  type: 'text',
  id: 'cityBilling',
  placeholder: 'write your city ...',
  validation: {
    ...cityValidationRules,
  },
};

export const countryBillingElementParams = {
  className: 'InputForm',
  name: 'countryBilling',
  label: 'Country:',
  type: 'select',
  id: 'countryBilling',
  placeholder: 'write your country ...',
  validation: {
    ...countryValidationRules,
  },
};

export const postcodeBillingElementParams = {
  className: 'InputForm',
  name: 'postcodeBilling',
  label: 'Postcode:',
  type: 'text',
  id: 'postcodeBilling',
  placeholder: 'write your postcode ...',
  validation: {
    ...postcodeValidationRules,
  },
};

export const descElementParams = {
  className: 'InputForm',
  name: 'description',
  label: 'Description:',
  type: 'text',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    ...descValidationRules,
  },
};

export const passwordElementParams = {
  className: 'InputForm',
  name: 'password',
  label: 'Password:',
  type: 'password',
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    ...passwordValidationRules,
  },
};

export const numElementParams = {
  className: 'InputForm',
  name: 'num',
  label: 'Number:',
  type: 'number',
  id: 'num',
  placeholder: 'write a number ...',
  validation: {
    ...numValidationRules,
  },
};

export const emailElementParams = {
  className: 'InputForm',
  name: 'email',
  label: 'Email:',
  type: 'email',
  id: 'email',
  placeholder: 'write an email address ...',
  validation: {
    ...emailValidationRules,
  },
};

export const addressShippingElementParams = {
  className: 'InputForm',
  name: 'streetShipping',
  label: 'Street:',
  type: 'text',
  id: 'streetShipping',
  placeholder: 'write your street ...',
  validation: {
    ...addressValidationRules,
  },
};

export const cityShippingElementParams = {
  className: 'InputForm',
  name: 'cityShipping',
  label: 'City:',
  type: 'text',
  id: 'cityShipping',
  placeholder: 'write your city ...',
  validation: {
    ...cityValidationRules,
  },
};

export const countryShippingElementParams = {
  className: 'InputForm',
  name: 'countryShipping',
  label: 'Country:',
  type: 'select',
  id: 'countryShipping',
  placeholder: 'write your country ...',
  validation: {
    ...countryValidationRules,
  },
};

export const postcodeShippingElementParams = {
  className: 'InputForm',
  name: 'postcodeShipping',
  label: 'Postcode:',
  type: 'text',
  id: 'postcodeShipping',
  placeholder: 'write your postcode ...',
  validation: {
    ...postcodeValidationRules,
  },
};

export const sameAddressCheckboxParams = {
  label: 'Use same address as for billing',
  className: 'checkboxForm',
  name: 'sameAddress',
  type: 'checkbox',
  id: 'checkboxSameAddress',
};
export const defaultBillingCheckboxParams = {
  label: 'Make address default for billing',
  className: 'checkboxForm',
  name: 'defaultBilling',
  type: 'checkbox',
  id: 'checkboxBillingDefault',
};
export const defaultShippingCheckboxParams = {
  label: 'Make address default for shipping',
  className: 'checkboxForm',
  name: 'defaultShipping',
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

export const billingCheckboxParams = {
  label: 'Use for billing',
  className: 'checkboxForm',
  name: 'billingOnly',
  type: 'checkbox',
  id: 'checkboxBilling',
};
export const shippingCheckboxParams = {
  label: 'Use for billing',
  className: 'checkboxForm',
  name: 'shippingOnly',
  type: 'checkbox',
  id: 'checkboxShiping',
};
export const billingLabelParams = {
  name: 'Use for billing',
  htmlFor: 'checkboxBilling',
};
export const shippingLabelParams = {
  name: 'Use for shipping',
  htmlFor: 'checkboxShiping',
};
