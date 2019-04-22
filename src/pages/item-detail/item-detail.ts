import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items, Api, Auth } from '../../providers';
import {Item} from "../../models/item";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  groupDetails: any[];
  usersGroup: any[];
  sieceList: any[];

  segment = 'users';

  constructor(
    public navCtrl: NavController,
    public api: Api,
    public auth: Auth,
    navParams: NavParams,
    items: Items
  ) {
    this.item = navParams.get('item') || items.defaultItem;
    this.item.completed = true;
    this.getGroups( this.item.id ).subscribe((res: any) => {
      console.log(this.usersGroup) ;
    });
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.value);
    if(ev.value == 'science'){
      this.getSienceGroup( this.item.id );
    }
  }

  updateItem( item: Item ) {
    console.log(item);
    if( item.completed ){
      this.addGroup( item.id );
    }else{
      this.removeGroup( item.id );
    }
  }
  getSienceGroup( groudId: Number){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groudId
    };
    let seq = this.api.post('group/science', info).share();

    seq.subscribe((res: any) => {
      this.sieceList = res.users;
    });
    return seq;
  }
  getGroups( groudId: Number){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groudId
    };
    let seq = this.api.post('group/users', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.usersGroup = res.users;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  addGroup( groupId: Number ){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groupId
    };
    let seq = this.api.post('group/my/add', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  removeGroup( groupId: Number ){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groupId
    };
    let seq = this.api.post('group/my/remove', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
