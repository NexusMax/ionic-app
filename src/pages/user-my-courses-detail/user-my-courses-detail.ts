import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the UserMyCoursesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses-detail',
  templateUrl: 'user-my-courses-detail.html',
})
export class UserMyCoursesDetailPage {

  course;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth
  ) {
    this.course = navParams.get('course');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMyCoursesDetailPage');
  }

}
