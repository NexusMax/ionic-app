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

  studentsWithRating: any[];

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
    this.getStudentsWithRating();
  }

  setRating(item: any) {

    let title = '';
    let cancel = '';
    let save = '';
    let ratingPromText = '';
    let inputValue = "";
    let edit = false;

    if( item.rating !== null ){
      inputValue = item.rating.rating;
      edit = true;
    }

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
          placeholder: title,
          value: inputValue
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

            if( data.rating === "" ){
              data.rating = 0;
            }

            if( edit ){
              this.editRating(item.rating.id, data.rating);
            }else{
              this.saveRating(item.id, data.rating);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  getStudentsWithRating(){
    let info = {
      'token': this.auth.getToken(),
      'theme_id': this.theme.id
    };
    let seq = this.api.post('theme/ratings', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.studentsWithRating = res.data;

    }, err => {
      console.error('ERROR', err);
    });
    return seq;
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

      this.ionViewWillEnter();
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

  editRating(ratingId: number, rating: number){
    let info = {
      'token': this.auth.getToken(),
      'rating_id': ratingId,
      'rating': rating
    };
    let seq = this.api.post('rating/edit', info).share();

    seq.subscribe((res: any) => {

      this.ionViewWillEnter();
      let message = '';
      this.translateService.get('RATING_EDIT').subscribe((value) => {
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

  currentRating(item: any){
    if( item.rating !== null ){
      return item.rating.rating;
    }
    return 0;
  }

  deleteItem(ratingId: number){
    let info = {
      'token': this.auth.getToken(),
      'rating_id': ratingId
    };
    let seq = this.api.post('rating/remove', info).share();

    seq.subscribe((res: any) => {

      this.ionViewWillEnter();
      let message = '';
      this.translateService.get('RATING_DELETED').subscribe((value) => {
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

}
