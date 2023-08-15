/* eslint-disable react/jsx-props-no-spreading */

import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { ReactNode } from 'react';
import { findInputError, isFormInvalid } from '.';

export interface FormValues {
  name: string;
  label: string;
  type: string;
  id: string;
  placeholder: string;
  validation: object;
  multiline?: boolean;
  select?: boolean;
  className: string;
  children?: ReactNode;
}
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
    <motion.p
      className='flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md'
      {...framerError}
    >
      <MdError />
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
  className,
  children,
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

  return (
    <div className={cn('flex flex-col w-full gap-2', className)}>
      <div className='flex justify-between'>
        <label htmlFor={id} className='font-semibold capitalize'>
          {label}
        </label>
        <AnimatePresence mode='wait' initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error?.message as string}
              key={inputErrors.error?.message}
            />
          )}
        </AnimatePresence>
      </div>
      {select ? (
        <select
          id={id}
          data-type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
    </div>
  );
}
