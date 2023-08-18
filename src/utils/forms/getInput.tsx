/* eslint-disable react/jsx-props-no-spreading */

import { useState, ReactNode } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

export interface FormValues {
  name: string;
  label?: string;
  type?: string;
  id?: string;
  htmlFor?: string;
  placeholder?: string;
  validation?: object;
  multiline?: boolean;
  labelCheck?: boolean;
  select?: boolean;
  checkbox?: boolean;
  className: string;
  children?: ReactNode;
  value?: string;
  address?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

export default function GetInput(
  { name, type, id, placeholder, validation }: FormValues,
  register: UseFormRegister<FieldValues>,
): JSX.Element | undefined {
  let output;

  const setIsSameAddress = useState(false)[1];
  const handleChangeSameAddress = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const streetShippingElement = document.getElementById(
      'streetShipping',
    ) as HTMLInputElement;
    const streetBillingElement = document.getElementById(
      'streetBilling',
    ) as HTMLInputElement;
    const cityShippingElement = document.getElementById(
      'cityShipping',
    ) as HTMLInputElement;
    const cityBillingElement = document.getElementById(
      'cityBilling',
    ) as HTMLInputElement;
    const countryShippingElement = document.getElementById(
      'countryShipping',
    ) as HTMLInputElement;
    const countryBillingElement = document.getElementById(
      'countryBilling',
    ) as HTMLInputElement;
    const postcodeShippingElement = document.getElementById(
      'postcodeShipping',
    ) as HTMLInputElement;
    const postcodeBillingElement = document.getElementById(
      'postcodeBilling',
    ) as HTMLInputElement;
    if (event.target.checked) {
      streetShippingElement.value = streetBillingElement.value;
      cityShippingElement.value = cityBillingElement.value;
      countryShippingElement.value = countryBillingElement.value;
      postcodeShippingElement.value = postcodeBillingElement.value;
      streetShippingElement.focus();
      cityShippingElement.focus();
      countryShippingElement.focus();
      postcodeShippingElement.focus();
      cityBillingElement.focus();

      streetShippingElement.setAttribute('disabled', '');
      cityShippingElement.setAttribute('disabled', '');
      countryShippingElement.setAttribute('disabled', '');
      postcodeShippingElement.setAttribute('disabled', '');
    } else {
      streetShippingElement.removeAttribute('disabled');
      cityShippingElement.removeAttribute('disabled');
      countryShippingElement.removeAttribute('disabled');
      postcodeShippingElement.removeAttribute('disabled');
    }
    setIsSameAddress((current) => !current);
  };
  const setIsDefaultBilling = useState(false)[1];
  const handleChangeDefaultBilling = () => {
    setIsDefaultBilling((current) => !current);
  };
  const setIsDefaultShipping = useState(false)[1];
  const handleChangeDefaultShipping = () => {
    setIsDefaultShipping((current) => !current);
  };

  if (name === 'SameAddress') {
    output = (
      <input
        name={name}
        id={id}
        type={type}
        onChange={handleChangeSameAddress}
      />
    );
  } else if (name === 'DefaultBilling') {
    output = (
      <input
        id={id}
        type={type}
        {...register(name)}
        onChange={handleChangeDefaultBilling}
      />
    );
  } else if (name === 'DefaultShipping') {
    output = (
      <input
        id={id}
        type={type}
        {...register(name)}
        onChange={handleChangeDefaultShipping}
      />
    );
  } else if (name === 'streetBilling') {
    output = (
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, validation)}
      />
    );
  } else if (name === 'cityBilling') {
    output = (
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, validation)}
      />
    );
  } else if (name === 'postcodeBilling') {
    output = (
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, validation)}
      />
    );
  } else if (name === 'streetShipping') {
    output = (
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, validation)}
      />
    );
  } else if (name === 'cityShipping') {
    output = (
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, validation)}
      />
    );
  } else if (name === 'postcodeShipping') {
    output = (
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...register(name, validation)}
      />
    );
  }
  return output;
}
