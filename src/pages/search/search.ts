import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, Api, Auth } from '../../providers';
import {TranslateService} from "@ngx-translate/core";

import * as _ from 'underscore';
import { Pager } from "../../providers";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  allData: any = [];
  currentItems: any = [];

  // pager object
  pager: any = {};



  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public items: Items,
      public api: Api,
      public auth: Auth,
      public toastCtrl: ToastController,
      public translateService: TranslateService,
      private pagerService: Pager
  ) {
    this.getGroups();
  }

  ionViewWillEnter(){
    this.getGroups();
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allData.total, page, Number( this.allData.per_page ));

    console.log( this.pager );
    // get current page of items
    this.getGroups1( page );
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
      this.addGroup( item );
    }else{
      this.removeGroup( item );
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
      this.allData = res;
      this.currentItems = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


  getGroups( page: number = 1 ){

    let info = {
      'token': this.auth.getToken(),
      'page': page
    };
    let seq = this.api.get('group/list', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.allData = res;
      this.currentItems = res.data;

      this.setPage(1);
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  getGroups1( page: number = 1 ){

    let info = {
      'token': this.auth.getToken(),
      'page': page
    };
    let seq = this.api.get('group/list', info).share();

    seq.subscribe((res: any) => {
      this.allData = res;
      this.currentItems = res.data;

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addGroup( groupId: any ){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groupId.id
    };
    let seq = this.api.post('group/my/add', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      let message = '';
      this.translateService.get('GROUP_ADD').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message + ' ' + groupId.name,
        duration: 3000,
        position: 'top'
      });
      toast.present();

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  removeGroup( groupId: any ){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groupId.id
    };
    let seq = this.api.post('group/my/remove', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      let message = '';
      this.translateService.get('GROUP_REMOVE').subscribe((value) => {
        message = value + ' ' + groupId.name;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
