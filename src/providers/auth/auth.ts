import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Auth {
  private token: string = 'token';

  constructor() {
  }

  saveToken(token: string){
      localStorage.setItem(this.token, token);
  }

  getToken(){
    return localStorage.getItem(this.token);
  }

  removeToken(){
    localStorage.removeItem(this.token);
  }
}
