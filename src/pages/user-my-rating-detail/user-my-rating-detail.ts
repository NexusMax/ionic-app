import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth} from "../../providers";

/**
 * Generated class for the UserMyRatingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-rating-detail',
  templateUrl: 'user-my-rating-detail.html',
})
export class UserMyRatingDetailPage {

  theme;
  rating;
  ratingInfo: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {

    this.theme = navParams.get('theme');
    this.rating = navParams.get('rating');

    console.log( this.theme );
    console.log( this.rating );

  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    //this.getRatingInfo();
  }

  getRatingInfo(){
    let info = {
      'token': this.auth.getToken(),
      'rating_id': this.rating.rating.id
    };
    let seq = this.api.get('student/rating/get', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.ratingInfo = res.data;
      console.log( this.rating );
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

}
