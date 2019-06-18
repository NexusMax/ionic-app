import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the UserMyRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-rating',
  templateUrl: 'user-my-rating.html',
})
export class UserMyRatingPage {

  theme;
  rating: any[];

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
    this.getRating();
  }

  getRating(){
    let info = {
      'token': this.auth.getToken(),
      'theme_id': this.theme.id
    };
    let seq = this.api.get('student/rating/list', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.rating = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
