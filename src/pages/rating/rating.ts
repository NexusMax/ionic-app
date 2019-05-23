import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth} from "../../providers";

/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  students: any[];
  group: any;
  theme: any;

  item: any;
  science:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,

    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {

    this.group = this.navParams.get('group');
    this.theme = this.navParams.get('theme');

    this.science = this.navParams.get('science');
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  ionViewWillEnter(){
    this.getGroups();
  }

  setRating(item: any) {

    let title = '';
    let cancel = '';
    let save = '';
    let ratingPromText = '';

    this.translateService.get('RATING_TITLE').subscribe((value) => {
      title = value;
    });
    this.translateService.get('CANCEL').subscribe((value) => {
      cancel = value;
    });
    this.translateService.get('SAVE').subscribe((value) => {
      save = value;
    });
    this.translateService.get('RATING_PROM_TEXT').subscribe((value) => {
      ratingPromText = value;
    });

    const prompt = this.alertCtrl.create({
      title: title,
      message: ratingPromText,
      inputs: [
        {
          name: 'rating',
          placeholder: title
        },
      ],
      buttons: [
        {
          text: cancel,
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: save,
          handler: data => {
            this.saveRating(item.id, data.rating );
          }
        }
      ]
    });
    prompt.present();
  }

  saveRating(studenId: number, rating: number){
    let info = {
      'token': this.auth.getToken(),
      'theme_id': this.theme.id,
      'student_id': studenId,
      'rating': rating
    };
    let seq = this.api.post('rating/add', info).share();

    seq.subscribe((res: any) => {

      console.log( res );
      let message = '';
      this.translateService.get('RATING_ADD').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  getGroups(){

    let info = {
      'token': this.auth.getToken(),
      'group_id': this.group.id
    };
    let seq = this.api.post('group/users', info).share();

    seq.subscribe((res: any) => {
      this.students = res.users;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
