import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, Api, Auth } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  groupItems: any[];

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public api: Api,
    public auth: Auth,
    public modalCtrl: ModalController
  ) {
    this.currentItems = this.items.query();
    this.getGroups();

    console.log( this.currentItems );

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
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  getGroups(){

    let info = {
      'token': this.auth.getToken(),
    };
    let seq = this.api.post('group/list', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.groupItems = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
}
