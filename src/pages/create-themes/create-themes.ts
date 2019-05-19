import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Items, Api, Auth } from '../../providers';
import {SettingsPage} from "../settings/settings";
import {CreateScienceFormPage} from "../create-science-form/create-science-form";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the CreateSciencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-themes',
  templateUrl: 'create-themes.html',
})
export class CreateThemesPage {

  sieceList: any[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
    public translateService: TranslateService
  ){
    this.getSience();

    let showNewScience = this.navParams.get('showNewScience');
    let showEditScience = this.navParams.get('showEditScience');

    if( showNewScience || showEditScience ){

      let message = '';

      let key = 'SCIENCE_CREATE';
      let scienceName = showNewScience;
      if( showEditScience ){
        key = 'SCIENCE_EDIT';
        scienceName = showEditScience;
      }
      this.translateService.get(key).subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message + ': ' + scienceName,
        duration: 5000,
        position: 'top'
      });
      toast.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSciencePage');
  }

  ionViewWillEnter(){
    this.getSience();
  }

  deleteItem(itemId: Number) {
    let info = {
      'token': this.auth.getToken(),
      'course_id': itemId
    };
    let seq = this.api.post('course/remove', info).share();

    seq.subscribe((res: any) => {

      let message = '';
      this.translateService.get('SCIENCE_REMOVE').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      this.ionViewWillEnter();
    });
    return seq;
  }

  getSience( ){

    let info = {
      'token': this.auth.getToken()
    };
    let seq = this.api.get('course/my', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.sieceList = res.data;
    });
    return seq;
  }

  openPageCreate(){
    this.navCtrl.push('CreateScienceFormPage');
  }

  openItem(item: any){
    this.navCtrl.push('CreateScienceFormPage', {
      'item': item
    });
  }
}
