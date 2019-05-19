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
  selector: 'page-create-themes-form',
  templateUrl: 'create-themes-form.html',
})
export class CreateThemesFormPage {

  course_name: string = '';

  private loginErrorString: string;

  item: any;

  edit: boolean = false;
  title: string;
  submitButtonText: string;


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
    });

    this.item = this.navParams.get('item');

    if( this.item ){
      this.edit = true;
      this.course_name = this.item.name;
    }

    let titleKey = 'CREATE_SCIENCE';
    let submitButtonTextKey = 'SAVE_BUTTON';
    if( this.edit ){
      titleKey = 'EDIT_SCIENCE';
      //submitButtonTextKey = 'EDIT_BUTTON';
    }

    this.translateService.get(titleKey).subscribe((value) => {
      this.title = value;
    });
    this.translateService.get(submitButtonTextKey).subscribe((value) => {
      this.submitButtonText = value;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateScienceFormPage');
  }

  save(){
    if( this.edit ){
      this.editScience();
    }else{
      this.createScience();
    }
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

  editScience(){
    let info = {
      'token': this.auth.getToken(),
      'course_name': this.course_name,
      'course_id': this.item.id
    };

    let seq = this.api.post('course/edit', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      this.navCtrl.setRoot('CreateSciencePage', {
        'showEditScience': this.course_name
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
