import { ProfileAction, Action, Address } from '../../../types/api';

export const getChangeEmailRequestLine = (email: string) => {
  return { action: Action.ChangeEmail, email };
};

export const getSetFirstNameRequestLine = (firstName: string) => {
  return { action: Action.SetFirstName, firstName };
};

export const getSetLastNameRequestLine = (lastName: string) => {
  return { action: Action.SetLastName, lastName };
};

export const getAddAddressRequestLine = (address: Address) => {
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

export const getRemoveAddressRequestLine = (addressId: string) => {
  return { action: Action.RemoveAddress, addressId };
};

export const getSetDefaultShippingAddressRequestLine = (addressId: string) => {
  return { action: Action.SetDefaultShippingAddress, addressId };
};

export const getAddShippingAddressIdRequestLine = (addressId: string) => {
  return { action: Action.AddShippingAddressId, addressId };
};

export const getRemoveShippingAddressIdRequestLine = (addressId: string) => {
  return { action: Action.RemoveShippingAddressId, addressId };
};

export const getSetDefaultBillingAddressRequestLine = (addressId: string) => {
  return { action: Action.SetDefaultBillingAddress, addressId };
};

export const getAddBillingAddressIdRequestLine = (addressId: string) => {
  return { action: Action.AddBillingAddressId, addressId };
};

export const getRemoveBillingAddressIdRequestLine = (addressId: string) => {
  return { action: Action.RemoveBillingAddressId, addressId };
};

export const getSetDateOfBirthRequestLine = (dateOfBirth?: Date) => {
  return { action: Action.SetDateOfBirth, dateOfBirth };
};
