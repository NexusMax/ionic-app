import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the UserMyGroupInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-group-information',
  templateUrl: 'user-my-group-information.html',
})
export class UserMyGroupInformationPage {

  myGroupInformation: any[];
  myGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {

    this.myGroup = navParams.get('group');

  }

  ionViewDidLoad() {
    this.getCourses();
  }

  getCourses(){

    let info = {
      'token': this.auth.getToken(),
    };
    let seq = this.api.get('student/group/info', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.myGroupInformation = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
