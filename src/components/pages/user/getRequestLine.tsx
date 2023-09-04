import { ProfileAction, Action } from '../../../types/api';

export const getChangeEmailRequestLine = (email: string) => {
  return { action: Action.ChangeEmail, email };
};

export const getSetFirstNameRequestLine = (firstName: string) => {
  return { action: Action.SetFirstName, firstName };
};

export const getSetLastNameRequestLine = (lastName: string) => {
  return { action: Action.SetLastName, lastName };
};

export const getAddAddressRequestLine = (address: ProfileAction) => {
  return { action: Action.AddAddress, address };
};

export const getChangeAddressLine = (
  address: ProfileAction,
  addressId: ProfileAction,
) => {
  return {
    action: Action.ChangeAddress,
    address,
    addressId,
  };
};

export const getRemoveAddressRequestLine = (addressId: ProfileAction) => {
  return { action: Action.RemoveAddress, addressId };
};

export const getSetDefaultShippingAddressRequestLine = (
  addressId: ProfileAction,
) => {
  return { action: Action.SetDefaultShippingAddress, addressId };
};

export const getAddShippingAddressIdRequestLine = (
  addressId: ProfileAction,
) => {
  return { action: Action.AddShippingAddressId, addressId };
};

export const getRemoveShippingAddressIdRequestLine = (
  addressId: ProfileAction,
) => {
  return { action: Action.RemoveShippingAddressId, addressId };
};

export const getSetDefaultBillingAddressRequestLine = (
  addressId: ProfileAction,
) => {
  return { action: Action.SetDefaultBillingAddress, addressId };
};

export const getAddBillingAddressIdRequestLine = (addressId: ProfileAction) => {
  return { action: Action.AddBillingAddressId, addressId };
};

export const getRemoveBillingAddressIdRequestLine = (
  addressId: ProfileAction,
) => {
  return { action: Action.RemoveBillingAddressId, addressId };
};

export const getSetDateOfBirthRequestLine = (dateOfBirth?: Date) => {
  return { action: Action.SetDateOfBirth, dateOfBirth };
};
