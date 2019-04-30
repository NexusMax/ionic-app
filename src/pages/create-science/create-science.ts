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
  selector: 'page-create-science',
  templateUrl: 'create-science.html',
})
export class CreateSciencePage {

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

    if( showNewScience ){

      let message = '';
      this.translateService.get('SCIENCE_CREATE').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message + ': ' + showNewScience,
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
}
