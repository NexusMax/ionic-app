import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items, Api, Auth } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  groupDetails: any[];
  usersGroup: any[];

  constructor(
    public navCtrl: NavController,
    public api: Api,
    public auth: Auth,
    navParams: NavParams,
    items: Items
  ) {
    this.item = navParams.get('item') || items.defaultItem;
    this.getGroups( this.item.id ).subscribe((res: any) => {
      console.log(this.usersGroup) ;
    });
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

}
