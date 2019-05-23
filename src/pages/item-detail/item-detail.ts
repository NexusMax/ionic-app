import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Items, Api, Auth } from '../../providers';
import {Item} from "../../models/item";
import {TranslateService} from "@ngx-translate/core";
import {CreateThemesPage} from "../create-themes/create-themes";

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

  segment = 'science';

  constructor(
    public navCtrl: NavController,
    public api: Api,
    public auth: Auth,
    navParams: NavParams,
    items: Items,
    public translateService: TranslateService,
    public toastCtrl: ToastController
  ) {
    this.item = navParams.get('item') || items.defaultItem;

    console.log( this.item );

    this.item.completed = true;
    this.getSienceGroup( this.item.id );
    this.getGroups( this.item.id ).subscribe((res: any) => {
     console.log(this.usersGroup) ;
    });

  }

  segmentChanged(ev: any) {
    if(ev.value == 'science'){
      this.getSienceGroup( this.item.id );
    }
  }

  updateItem( item: Item ) {
    if( item.completed ){
      this.addGroup( item.id );
    }else{
      this.removeGroup( item.id );
    }
  }

  updateScience( item: any ){
    if( item.completed ){
      this.addScienceToGroup( this.item.id, item.id );
    }else{
      this.removeScienceFromGroup( this.item.id, item.id);
    }
  }


  addScienceToGroup( groupId: number, scienceId: number ){
    let info = {
      'token': this.auth.getToken(),
      'course_id': scienceId,
      'group_id': groupId
    };
    let seq = this.api.post('course/my/add', info).share();

    seq.subscribe((res: any) => {

      let message = '';
      this.translateService.get('SCIENCE_ADD_TO_GROUP').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 5000,
        position: 'top'
      });
      toast.present();

    });
    return seq;
  }

  removeScienceFromGroup( groupId: number, scienceId: number ){
    let info = {
      'token': this.auth.getToken(),
      'course_id': scienceId,
      'group_id': groupId
    };
    let seq = this.api.post('course/my/remove', info).share();

    seq.subscribe((res: any) => {
      let message = '';
      this.translateService.get('SCIENCE_REMOVE_TO_GROUP').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 5000,
        position: 'top'
      });
      toast.present();
    });
    return seq;
  }


  getSienceGroup( groudId: Number){

    let info = {
      'token': this.auth.getToken(),
      'group_id': this.item.id
    };
    let seq = this.api.get('course/my', info).share();

    seq.subscribe((res: any) => {
      this.sieceList = res.data;
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

      let message = '';
      this.translateService.get('GROUP_ADD_THIS').subscribe((value) => {
        message = value;
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
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


  openThemes(item: any){

    console.log( item.completed );
    if( item.completed ){
      this.navCtrl.setRoot('CreateThemesPage', {
        item: item,
        science: item,
        group: this.item,
        group_id: this.item.id
      });
    }else{
      let message = '';
      this.translateService.get('GROUP_ADD_LIST').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

}
