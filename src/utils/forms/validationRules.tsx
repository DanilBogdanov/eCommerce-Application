type ValidationParams = {
  required: { message: string; value: boolean };
  minLength?: { message: string; value: number };
  maxLength?: { message: string; value: number };
  pattern?: { message: string; value: RegExp };
  max?: { value: string; message: string };
};

export const postcodeValidationRules: ValidationParams = {
  required: {
    value: false,
    message: 'required',
  },
};

export const passwordValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  minLength: {
    value: 8,
    message: 'min 8 characters',
  },
  pattern: {
    value:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?!\s.*)(?!.*\s$).*$/,
    message:
      'At least 1 of uppercase letters, lowercase letters, digits, special character (e.g., !@#$%^&*). No leading or trailing whitespaces',
  },
};

export const nameValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  pattern: {
    value: /^[A-Za-z]+$/,
    message: 'Use only letters (A-Z, a- z)',
  },
};

export const surnameValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  pattern: {
    value: /^[A-Za-z]+$/,
    message: 'Use only letters (A-Z, a- z)',
  },
};

const dateMaximum = (): string => {
  const currentDate = new Date();
  const currentDateMS = currentDate.getTime();
  const thirteenYearsMS = 410240038000;
  const dateMaxMS = new Date(currentDateMS - thirteenYearsMS);
  const dateMax = dateMaxMS.toISOString().slice(0, 10);
  return dateMax;
};
export const birthdateValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  max: {
    value: dateMaximum(),
    message: 'Only 13 years old or older',
  },
};

export const streetValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
};

export const cityValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  pattern: {
    value: /^[A-Za-z]+$/,
    message: 'Use only letters (A-Z, a- z)',
  },
};

export const countryValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
};

export const descValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  maxLength: {
    value: 200,
    message: '200 characters max',
  },
};

export const numValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
};

export const emailValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'your email should be like "user@example.com"',
  },
};

// change to default loginValidationRules on release
export const loginPasswordValidationRules: ValidationParams = {
  required: {
    value: true,
    message: 'required',
  },
  minLength: {
    value: 1,
    message: 'min 1 characters',
  },
};
