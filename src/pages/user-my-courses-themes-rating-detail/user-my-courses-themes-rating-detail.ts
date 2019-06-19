import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth} from "../../providers";

/**
 * Generated class for the UserMyCoursesThemesRatingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses-themes-rating-detail',
  templateUrl: 'user-my-courses-themes-rating-detail.html',
})
export class UserMyCoursesThemesRatingDetailPage {

  rating;
  course;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {
    this.rating = navParams.get('rating');
    this.course = navParams.get('course');
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
  }

  currentRating(item: any){
    if( item.rating !== null ){
      return item.rating.rating;
    }
    return 0;
  }

}
