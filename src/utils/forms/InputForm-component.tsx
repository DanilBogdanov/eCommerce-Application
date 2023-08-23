/* eslint-disable react/jsx-props-no-spreading */

import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { useState } from 'react';
import { findInputError, isFormInvalid } from '.';
import countryOptions from './countryOptions';
import GetInput, { FormValues } from './getInput';

export type InputErrorsTypes = {
  message?: string;
};
const framerError = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
function InputError({ message }: InputErrorsTypes) {
  return (
    <motion.p className='ValidationMessage' {...framerError}>
      <MdError className='ValidationIcon' />
      {message}
    </motion.p>
  );
}
export function InputForm({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  select,
  checkbox,
  labelCheck,
  className,
  htmlFor,
  address,
}: FormValues) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  type InputErrorsTypesAll = {
    error?: typeof inputErrors;
    message?: string;
  };

  const inputErrors: InputErrorsTypesAll = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  const [selected, setSelected] = useState(countryOptions[0].value);
  const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };
  let element;
  if (select) {
    element = (
      <select
        {...register(name, validation)}
        className={className}
        value={selected}
        onChange={handleChangeCountry}
        id={id}
        data-type={type}
        placeholder={placeholder}
      >
        {countryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    );
  } else if (checkbox && name) {
    element = GetInput({ name, type, id, className } as FormValues, register);
  } else if (labelCheck) {
    element = <label htmlFor={htmlFor}>{name}</label>;
  } else if (address) {
    element = GetInput(
      { name, type, id, placeholder, validation, className } as FormValues,
      register,
    );
  } else {
    element = (
      <input
        placeholder={placeholder}
        {...register(name, validation)}
        id={id}
        type={type}
        className={className}
      />
    );
  }

  return (
    <div className={id}>
      <div>
        <label htmlFor={id}>{label}</label>
        <AnimatePresence mode='wait' initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error?.message as string}
              key={inputErrors.error?.message}
            />
          )}
        </AnimatePresence>
      </div>
      {element}
    </div>
  );
}
