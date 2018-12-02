import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Auth } from '../auth/auth';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  private isLoggedIn = false;
  private isLoggedInStorage = 'isLoggedIn';
  private userStorage = 'user';

  constructor(
    public api: Api,
    public auth: Auth,
  ) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('auth/login', accountInfo).share();

    seq.subscribe((res: any) => {

      if ( res.token ) {
        this._login( res );
      }

    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {

        this._login( res );
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }



  getUser(){
    return JSON.parse(localStorage.getItem( this.userStorage ) );
    //return this._user;
  }

  authenticated() : boolean {

    if( localStorage.getItem( this.isLoggedInStorage ) === 'true' ){
      return true;
    }
    return false;
    //return this.isLoggedIn;
  }

  logout() : void {
    this.isLoggedIn = false;
    this._user = null;
    this.auth.removeToken();
  }

  _login(res: any = '') : void {
    this._user = res.user;
    this.isLoggedIn = true;
    localStorage.setItem( this.userStorage, JSON.stringify(res.user) );
    localStorage.setItem( this.isLoggedInStorage, 'true' );

    this.auth.saveToken(res.token);
  }
}
