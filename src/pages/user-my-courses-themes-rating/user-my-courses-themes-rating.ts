import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth} from "../../providers";
import {UserMyCoursesThemesRatingDetailPage} from "../user-my-courses-themes-rating-detail/user-my-courses-themes-rating-detail";

/**
 * Generated class for the UserMyCoursesThemesRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses-themes-rating',
  templateUrl: 'user-my-courses-themes-rating.html',
})
export class UserMyCoursesThemesRatingPage {

  course;
  themesRating: any[];

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
  }

  ionViewWillEnter(){
    this.getCoursesRating();
  }

  getCoursesRating(){
    let info = {
      'token': this.auth.getToken(),
      'course_id': this.course.id
    };
    let seq = this.api.get('student/rating/all', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.themesRating = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  currentRating(item: any){
    if( item.rating !== null ){
      return item.rating.rating;
    }
    return 0;
  }

  openRating(rating: any){
    this.navCtrl.push('UserMyCoursesThemesRatingDetailPage', {
      rating: rating,
      course: this.course
    });
  }

}
