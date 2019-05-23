import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, Api, Auth } from '../../providers';
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  groupItems: any[];
  tabs;

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public api: Api,
    public auth: Auth,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public toastCtrl: ToastController
  ) {
    this.tabs = navCtrl.parent;
    this.currentItems = this.items.query();
    this.getGroups();

    console.log( this.currentItems );

  }

  ionViewWillEnter(){
    this.getGroups();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {

    this.navCtrl.setRoot('ItemDetailPage', {
      item: item
    });
  }

  getGroups(){

    let info = {
      'token': this.auth.getToken(),
    };
    let seq = this.api.get('group/my', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.groupItems = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  openPageSearch(){


    this.tabs.select(1);

    //this.navCtrl.setRoot('SearchPage');
  }

  removeGroup( groupId: Number ){

    let info = {
      'token': this.auth.getToken(),
      'group_id': groupId
    };
    let seq = this.api.post('group/my/remove', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      let message = '';
      this.translateService.get('GROUP_REMOVE_THIS').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      this.ionViewWillEnter();
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
}
