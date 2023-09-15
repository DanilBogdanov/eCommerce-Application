import { ApiResponse, AuthCallback, Profile } from '../../../../types/api';

interface TokenStoreInterface {
  getToken: jest.Mock<Promise<ApiResponse<string>>, []>;
  isAnonym: jest.Mock<boolean, []>;
  getEmail: jest.Mock<string, []>;
}

interface AuthInterface {
  onChangeUser: jest.Mock<void, [AuthCallback]>;
  logout: jest.Mock<Promise<ApiResponse<void>>, []>;
}

interface UserInterface {
  isAnonymous: jest.Mock<boolean, []>;
  getEmail: jest.Mock<string, []>;
  getProfile: jest.Mock<Promise<ApiResponse<Profile>>, []>;
}

class MockApi {
  public tokenStore: TokenStoreInterface = {
    getToken: jest.fn(),
    isAnonym: jest.fn(),
    getEmail: jest.fn(),
  };

  public auth: AuthInterface = {
    onChangeUser: jest.fn(),
    logout: jest.fn(),
  };

  public user: UserInterface = {
    isAnonymous: jest.fn(),
    getEmail: jest.fn(),
    getProfile: jest.fn(),
  };
}

export default MockApi;
