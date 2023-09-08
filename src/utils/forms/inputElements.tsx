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
  value: '',
  validation: {
    ...nameValidationRules,
  },
};

export const surnameElementParams = {
  className: 'InputForm',
  name: 'surnam',
  label: 'Surname:',
  type: 'text',
  value: '',
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
  value: '',
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

export const currentPasswordElementParams = {
  className: 'InputForm',
  name: 'currentPassword',
  label: 'Current password:',
  type: 'password',
  id: 'currentPassword',
  placeholder: 'type current password ...',
  validation: {
    ...passwordValidationRules,
  },
};

export const newPasswordElementParams = {
  className: 'InputForm',
  name: 'newPassword',
  label: 'New password:',
  type: 'password',
  id: 'newPassword',
  placeholder: 'type new password ...',
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
  name: 'billing',
  type: 'checkbox',
  id: 'checkboxBilling',
};
export const shippingCheckboxParams = {
  label: 'Use for shipping',
  className: 'checkboxForm',
  name: 'shipping',
  type: 'checkbox',
  id: 'checkboxShipping',
};

export const addressElementParams = {
  className: 'InputForm',
  name: 'street',
  label: 'Street:',
  type: 'text',
  id: 'street',
  placeholder: 'write your street ...',
  validation: {
    ...addressValidationRules,
  },
};

export const cityElementParams = {
  className: 'InputForm',
  name: 'city',
  label: 'City:',
  type: 'text',
  id: 'city',
  placeholder: 'write your city ...',
  validation: {
    ...cityValidationRules,
  },
};

export const countryElementParams = {
  className: 'InputForm',
  name: 'country',
  label: 'Country:',
  type: 'select',
  id: 'country',
  placeholder: 'write your country ...',
  validation: {
    ...countryValidationRules,
  },
};

export const postcodeElementParams = {
  className: 'InputForm',
  name: 'postcode',
  label: 'Postcode:',
  type: 'text',
  id: 'postcode',
  placeholder: 'write your postcode ...',
  validation: {
    ...postcodeValidationRules,
  },
};
