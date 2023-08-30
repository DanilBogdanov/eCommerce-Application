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
import { RegisterForm } from '../../../types/api';
import { MessageType, notifier } from '../../../utils/notifier';
import {
  MESSAGE_SHOW_TIME_ERROR,
  MESSAGE_SHOW_TIME_SUCCESS,
} from '../../../types/constants';
import { api } from '../../../api/api';

import '../../../utils/forms/FormsStyle.css';

function Registration(): ReactElement {
  const methods = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const logup = async (registerForm: RegisterForm) => {
    const resp = await api.auth.registerAndLogin(registerForm);
    if (resp.isSuccessful) {
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
    // const { email, password, surnam, name, dateOfBirth } = values;

    //
    const {
      email,
      password,
      surnam,
      name,
      dateOfBirth,
      sameAddress,
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

    const addressArr = [];
    addressArr.push(BillingObj);

    const firstName = name;
    const lastName = surnam;

    const registerForm: RegisterForm = {
      email,
      password,
      addresses: addressArr,
      firstName,
      lastName,
      dateOfBirth,

      // add rest fields
      // address ID fields add in loop lower
    };

    const billingIndex = 0;
    const shippingIndex = 1;

    if (sameAddress) {
      registerForm.billingAddresses = [billingIndex];
      registerForm.shippingAddresses = [billingIndex];
    } else {
      addressArr.push(ShippingObj);
      registerForm.billingAddresses = [billingIndex];
      registerForm.shippingAddresses = [shippingIndex];
    }

    if (defaultBilling) {
      registerForm.defaultBillingAddress = billingIndex;
    }
    if (defaultShipping && sameAddress) {
      registerForm.defaultShippingAddress = billingIndex;
    }
    if (defaultShipping && !sameAddress) {
      registerForm.defaultShippingAddress = shippingIndex;
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
