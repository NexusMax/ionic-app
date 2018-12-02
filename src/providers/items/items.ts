import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import { Auth } from '../auth/auth';

@Injectable()
export class Items {

  constructor(
    public api: Api,
    public auth: Auth,
  ) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

  getGroups(){

    let info = {
      'token': this.auth.getToken(),
    };
    let seq = this.api.post('group/list', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

    }, err => {
      console.error('ERROR', err);
    });

    return seq;


  }

}
