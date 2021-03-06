import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";
import {UserMyGroupInformationPage} from "../user-my-group-information/user-my-group-information";

/**
 * Generated class for the UserMyGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-group',
  templateUrl: 'user-my-group.html',
})
export class UserMyGroupPage {

  myGroupStudents: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth
) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.getMyGroupStudents();
  }

  getMyGroupStudents(){

    let info = {
      'token': this.auth.getToken(),
    };
    let seq = this.api.get('student/group/users', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.myGroupStudents = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  openGroup( group: any ){
    this.navCtrl.push('UserMyGroupInformationPage', {
      group: group
    });
  }

}
