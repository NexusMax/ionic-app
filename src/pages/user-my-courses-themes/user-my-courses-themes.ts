import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserMyCoursesThemesDetailPage} from "../user-my-courses-themes-detail/user-my-courses-themes-detail";
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth} from "../../providers";

/**
 * Generated class for the UserMyCoursesThemesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses-themes',
  templateUrl: 'user-my-courses-themes.html',
})
export class UserMyCoursesThemesPage {

  themes: any[];
  course;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {
    this.course = navParams.get('course');
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.getCoursesThemes();
  }

  getCoursesThemes(){
    let info = {
      'token': this.auth.getToken(),
      'course_id': this.course.id
    };
    let seq = this.api.get('student/theme/get', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.themes = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  openThemesRating(theme:any){
    this.navCtrl.push('UserMyRatingPage', {
      theme: theme
    });
  }

  openThemes(theme: any){
    this.navCtrl.push('UserMyCoursesThemesDetailPage', {
      theme: theme
    });
  }

}
