import axios from 'axios';
import { ApiResponse, Profile, config } from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';

class User {
  private tokenStore: TokenStore;

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }

  public isAnonymous(): boolean {
    return this.tokenStore.isAnonym();
  }

  public getEmail(): string {
    return this.tokenStore.getEmail();
  }

  public async getProfile(): Promise<ApiResponse<Profile>> {
    if (this.tokenStore.isAnonym()) {
      return {
        isSuccessful: false,
        message: 'Anonymous user has no profile',
      };
    }

    const tokenResp = await this.tokenStore.getToken();

    if (!tokenResp.isSuccessful || !tokenResp.data) {
      return {
        isSuccessful: false,
        message: `Can't get token: ${tokenResp.message}`,
      };
    }

    try {
      const profile = await User.me(tokenResp.data);
      return {
        isSuccessful: true,
        message: 'Success',
        data: profile,
      };
    } catch (e) {
      return handleError<Profile>(e);
    }
  }

  private static async me(token: string): Promise<Profile> {
    const { data } = await axios.get<Profile>(
      `${config.apiUrl}/${config.projectKey}/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }
}

export default User;
