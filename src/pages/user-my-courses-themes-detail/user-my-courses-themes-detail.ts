import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the UserMyCoursesThemesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses-themes-detail',
  templateUrl: 'user-my-courses-themes-detail.html',
})
export class UserMyCoursesThemesDetailPage {

  theme;
  themeInfo;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {
    this.theme = navParams.get('theme');
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.getThemesDetail();
  }

  getThemesDetail(){
    let info = {
      'token': this.auth.getToken(),
      'theme_id': this.theme.id
    };
    let seq = this.api.get('student/theme/get', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.themeInfo = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


}
