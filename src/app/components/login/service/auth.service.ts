import { Injectable } from '@angular/core';

export interface Profile {
  first_name: string;
  last_name: string;
}

export interface Session {
  token: string;
  profile: Profile;
}

export interface Credentials {
  login: string;
  password: string;
  remember_login?: string;
  profile: Profile;
}

export interface AuthResponse {
  success: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  users: Credentials[] = [
    {
        login: "alias",
        password: "asdf1234",
        remember_login: "false",
        profile: {
          first_name: "John",
          last_name: "Doe"
        }
    }
  ];

  /** 
   * Would be stored an in actual Auth0 style authentication system.
   * Depends on the bank's current authorization system.
   * Ideally we'd use the same authentication process as their web application.
   */
  session: Session;

  constructor(
  ) {
  }

  async login(creds: Credentials): Promise<AuthResponse> {
    let response = {} as AuthResponse;
    try {
      const profile = await this.resolveUser(creds);
      if(profile) {
        response.success = true;
        this.session = {
          token: btoa(JSON.stringify(creds)),
          profile
        }
      } else {
        response.success = false;
        response.error = "Failed to authenticate the provided credentials."
      }
    } catch(e) {
      response.error = await this.handleError(e);
      response.success = false;
    } finally {
      return response;
    }
  }

  async handleError(e): Promise<string> {
    // Here we'd want to notify the analytics solution used be the bank
    return Promise.resolve('some_error_code');
  }

  get validate(): Session {
    return this.session ? this.session : {token: 'asdf1234', profile: {first_name: "John", last_name: "Doe"}} as Session;
  }

  async resolveUser(creds: Credentials): Promise<Profile> {
    const u = this.users.find(u => u.login === creds.login && u.password === creds.password);
    if(u) {
      return u.profile;
    } else {
      return;
    }
  }
}
