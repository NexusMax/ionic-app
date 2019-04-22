import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, Api, Auth } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public items: Items,
      public api: Api,
      public auth: Auth,
  ) {
    this.getGroups();
  }

  ionViewWillEnter(){
    this.getGroups();
  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {

    let val = ev.target.value;
    if (!val || !val.trim()) {
      return;
    }
    this.getSearchGroups(val);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  updateItem(item: Item){
    console.log(item);
    if( item.completed ){
      this.addGroup( item.id );
    }else{
      this.removeGroup( item.id );
    }

  }

  getSearchGroups( param: any ){
    let info = {
      'token': this.auth.getToken(),
      'group_name': param
    };
    let seq = this.api.get('group/search', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.currentItems = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


  getGroups( ){

    let info = {
      'token': this.auth.getToken()
    };
    let seq = this.api.get('group/list', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.currentItems = res.data;
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
