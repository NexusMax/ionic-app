import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Items, Api, Auth } from '../../providers';
import {CreateSciencePage} from "../create-science/create-science";

/**
 * Generated class for the CreateScienceFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-science-form',
  templateUrl: 'create-science-form.html',
})
export class CreateScienceFormPage {

  course_name: string = '';

  private loginErrorString: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public auth: Auth,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {

    this.translateService.get('SCIENCE_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateScienceFormPage');
  }

  createScience(){

    let info = {
      'token': this.auth.getToken(),
      'course_name': this.course_name
    };

    let seq = this.api.post('course/create', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      this.navCtrl.setRoot('CreateSciencePage', {
        'showNewScience': this.course_name
      });
    }, (res: any) => {
      console.log( res );

      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    return seq;



  }

}
