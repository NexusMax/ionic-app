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

  theme_name: string = '';

  private loginErrorString: string;

  item: any;

  edit: boolean = false;
  title: string;
  submitButtonText: string;

  groupId: number;
  scienceId: number;
  science: any;
  group: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public auth: Auth,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {

    this.translateService.get('THEMES_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.item = this.navParams.get('item');
    this.group = this.navParams.get('group');
    this.science = this.navParams.get('science');
    this.edit = this.navParams.get('edit');
    this.groupId = this.navParams.get('group_id');
    this.scienceId = this.navParams.get('course_id');

    if( this.edit ){
      this.theme_name = this.item.name;
    }

    let titleKey = 'CREATE_THEMES';
    let submitButtonTextKey = 'SAVE_BUTTON';
    if( this.edit ){
      titleKey = 'EDIT_THEMES';
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
    console.log('ionViewDidLoad CreateThemesFormPage');
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
      'theme_name': this.theme_name,
      'course_id': this.scienceId,
      'group_id': this.groupId
    };

    let seq = this.api.post('theme/create', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      this.navCtrl.setRoot('CreateThemesPage', {
        'showNewThemes': this.theme_name,
        'item': this.science,
        'group_id': this.groupId,
        'science': this.science,
        'group': this.group
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
      'theme_name': this.theme_name,
      'theme_id': this.item.id
    };

    let seq = this.api.post('theme/edit', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      this.navCtrl.setRoot('CreateThemesPage', {
        'showEditThemes': this.theme_name,
        'item': this.science,
        'science': this.science,
        'group_id': this.groupId,
        'group': this.group
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
