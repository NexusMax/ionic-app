import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth, User} from "../../providers";

/**
 * Generated class for the UserMyInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-information',
  templateUrl: 'user-my-information.html',
})
export class UserMyInformationPage {

  _user;
  group;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
    public user: User
  ) {
    this._user = this.user.getUser();
  }

  ionViewWillEnter(){
    this.getGroupInfo();
  }


  getGroupInfo(){
    let info = {
      'token': this.auth.getToken()
    };
    let seq = this.api.get('student/group/info', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.group = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
