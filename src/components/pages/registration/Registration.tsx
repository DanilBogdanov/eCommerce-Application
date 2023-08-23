/* eslint-disable react/jsx-props-no-spreading */

import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GrMail } from 'react-icons/gr';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  emailElementParams,
  passwordElementParams,
  nameElementParams,
  surnameElementParams,
  birthdateElementParams,
  streetBillingElementParams,
  cityBillingElementParams,
  countryBillingElementParams,
  postcodeBillingElementParams,
  streetShippingElementParams,
  cityShippingElementParams,
  countryShippingElementParams,
  postcodeShippingElementParams,
  sameAddressCheckboxParams,
  defaultBillingCheckboxParams,
  defaultShippingCheckboxParams,
} from '../../../utils/forms/inputElements';
import { InputForm } from '../../../utils/forms/InputForm-component';
import Api from '../../../api/api';
import { RegisterForm } from '../../../types/api';
import { MessageType, notifier } from '../../../utils/notifier';
import {
  MESSAGE_SHOW_TIME_ERROR,
  MESSAGE_SHOW_TIME_SUCCESS,
} from '../../../types/constants';

import '../../../utils/forms/FormsStyle.css';

type RegistrationProps = {
  api: Api;
};

function Registration({ api }: RegistrationProps): ReactElement {
  const methods = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const logup = async (registerForm: RegisterForm) => {
    const resp = await api.auth.registerAndLogin(registerForm);
    if (resp.result) {
      notifier.showMessage(
        MessageType.SUCCESS,
        'Registration',
        `User ${registerForm.email} successfully logged up`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      navigate('/');
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Registration',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmit = methods.handleSubmit(() => {
    const values = methods.getValues();
    const { email, password } = values;

    //
    const {
      defaultBilling,
      streetBilling,
      cityBilling,
      countryBilling,
      postcodeBilling,
      defaultShipping,
      streetShipping,
      cityShipping,
      countryShipping,
      postcodeShipping,
    } = values;

    const BillingObj = {
      key: 'billing',
      streetName: streetBilling,
      postalCode: postcodeBilling,
      city: cityBilling,
      country: countryBilling,
    };

    const ShippingObj = {
      key: 'shipping',
      streetName: streetShipping,
      postalCode: postcodeShipping,
      city: cityShipping,
      country: countryShipping,
    };

    const defaultBillingObj = {
      key: 'defaultBilling',
      streetName: streetBilling,
      postalCode: postcodeBilling,
      city: cityBilling,
      country: countryBilling,
    };

    const defaultShippingObj = {
      key: 'defaultShipping',
      streetName: streetShipping,
      postalCode: postcodeShipping,
      city: cityShipping,
      country: countryShipping,
    };

    const addressArr = [];
    addressArr.push(BillingObj, ShippingObj);
    if (defaultBilling) {
      addressArr.push(defaultBillingObj);
    }
    if (defaultShipping) {
      addressArr.push(defaultShippingObj);
    }

    const registerForm: RegisterForm = {
      email,
      password,
      addresses: addressArr,
      // add rest fields
      // address ID fields add in loop lower
    };

    for (let i = 0; i < registerForm.addresses!.length; i += 1) {
      const element = registerForm?.addresses[i];
      if (element.key === 'defaultBilling') {
        registerForm.defaultBillingAddress = i;
      } else if (element.key === 'defaultShipping') {
        registerForm.defaultShippingAddress = i;
      } else if (element.key === 'billing') {
        registerForm.billingAddresses = [i];
      } else if (element.key === 'shipping') {
        registerForm.shippingAddresses = [i];
      }
      delete element.key;
    }
    logup(registerForm);
    methods.reset();
    setSuccess(true);
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <FormProvider {...methods}>
      <form
        autoComplete='off'
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className='FormWrapper'
      >
        <div className='BioSection FormSection'>
          <h1 className='FormHeader'>Registrartion</h1>
          <h2 className='BioHeader SectionHeader'>Bio</h2>
          <InputForm {...emailElementParams} />
          <InputForm
            {...passwordElementParams}
            type={passwordShown ? 'text' : 'password'}
          />
          <button type='button' onClick={togglePassword} className='FormButton'>
            Show Password
          </button>
          <InputForm {...nameElementParams} />
          <InputForm {...surnameElementParams} />
          <InputForm {...birthdateElementParams} />
        </div>
        <div>
          <div className='AddressSectionWrapper'>
            <div className='AddressSection FormSection'>
              <h2 className='AddressHeader SectionHeader'>Billing Address</h2>
              <InputForm checkbox {...defaultBillingCheckboxParams} />
              <InputForm address {...streetBillingElementParams} />
              <InputForm address {...cityBillingElementParams} />
              <InputForm select {...countryBillingElementParams} />
              <InputForm address {...postcodeBillingElementParams} />
            </div>
            <div className='AddressSection FormSection'>
              <h2 className='AddressHeader SectionHeader'>Shipping Address</h2>
              <InputForm checkbox {...sameAddressCheckboxParams} />
              <InputForm checkbox {...defaultShippingCheckboxParams} />
              <InputForm address {...streetShippingElementParams} />
              <InputForm address {...cityShippingElementParams} />
              <InputForm select {...countryShippingElementParams} />
              <InputForm address {...postcodeShippingElementParams} />
            </div>
          </div>
        </div>
        <div className='ButtonWrapper'>
          {success && (
            <p>
              <BsFillCheckSquareFill />
              Form has been submitted successfully
            </p>
          )}
          <button
            type='button'
            onClick={onSubmit}
            className='FormButton SubmitButton'
          >
            <GrMail className='LogInUpIcon' />
            Sign Up
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Registration;
