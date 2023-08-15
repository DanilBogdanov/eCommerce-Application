/* eslint-disable react/jsx-props-no-spreading */

import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GrMail } from 'react-icons/gr';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import {
  emailValidation,
  passwordValidation,
  nameValidation,
  surnamValidation,
  birthdateValidation,
  streetValidation,
  cityValidation,
  countryValidation,
  postcodeValidation,
} from '../../../utils/forms/inputValidations';
import { InputForm } from '../../../utils/forms/InputForm-component';

function Registration(): ReactElement {
  const methods = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const [success, setSuccess] = useState(false);

  const onSubmit = methods.handleSubmit(() => {
    // data
    methods.reset();
    setSuccess(true);
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete='off' onSubmit={(e) => e.preventDefault()} noValidate>
        <div>
          <InputForm className='' {...emailValidation} />
          <InputForm
            className=''
            {...passwordValidation}
            type={passwordShown ? 'text' : 'password'}
          />
          <button type='button' onClick={togglePassword}>
            Show Password
          </button>
          <InputForm className='' {...nameValidation} />
          <InputForm className='' {...surnamValidation} />
          <InputForm className='' {...birthdateValidation} />
          <InputForm className='' {...streetValidation} />
          <InputForm className='' {...cityValidation} />
          <InputForm select className='' {...countryValidation} />
          <InputForm className='' {...postcodeValidation} />
        </div>
        <div>
          {success && (
            <p>
              <BsFillCheckSquareFill />
              Form has been submitted successfully
            </p>
          )}
          <button type='button' onClick={onSubmit}>
            <GrMail />
            Sign Up
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Registration;
