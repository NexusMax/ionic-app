import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Items, Api, Auth } from '../../providers';
import {SettingsPage} from "../settings/settings";
import {CreateThemesFormPage} from "../create-themes-form/create-themes-form";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the CreateSciencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-themes',
  templateUrl: 'create-themes.html',
})
export class CreateThemesPage {

  sieceList: any[];

  science: any;
  groupId: number;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
    public translateService: TranslateService
  ){
    let showNewThemes = this.navParams.get('showNewThemes');

    let showEditThemes = this.navParams.get('showEditThemes');
    this.science = this.navParams.get('item');
    this.groupId = this.navParams.get('group_id');

    console.log( this.science );

    this.getThemes( this.groupId, this.science.id );

    if( showNewThemes || showEditThemes ){

      let message = '';

      let key = 'SCIENCE_CREATE';
      let themesName = showNewThemes;
      if( showEditThemes ){
        key = 'SCIENCE_EDIT';
        themesName = showEditThemes;
      }
      this.translateService.get(key).subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message + ': ' + themesName,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateThemesPage');
  }

  ionViewWillEnter(){
    this.getThemes(this.groupId, this.science.id);
  }

  deleteItem(itemId: Number) {
    let info = {
      'token': this.auth.getToken(),
      'course_id': itemId
    };
    let seq = this.api.post('course/remove', info).share();

    seq.subscribe((res: any) => {

      let message = '';
      this.translateService.get('SCIENCE_REMOVE').subscribe((value) => {
        message = value;
      });

      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      this.ionViewWillEnter();
    });
    return seq;
  }

  getThemes( group_id: number, course_id: number){

    let info = {
      'token': this.auth.getToken(),
      'group_id': group_id,
      'course_id': course_id,
    };
    let seq = this.api.get('course/themes', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.sieceList = res.data;
    });
    return seq;
  }

  openPageCreate(){
    this.navCtrl.push('CreateThemesFormPage',
      {
        'group_id': this.groupId,
        'course_id': this.science.id
      }
    );
  }

  openItem(item: any){
    this.navCtrl.push('CreateThemesFormPage', {
      'item': item,
      'group_id': this.groupId,
      'course_id': this.science.id
    });
  }
}
