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

  group: any;
  science: any;
  groupId: number;
  item: any;


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
    this.item = this.navParams.get('item');
    this.group = this.navParams.get('group');
    this.science = this.navParams.get('science');
    this.groupId = this.navParams.get('group_id');


    if( showNewThemes || showEditThemes ){

      let message = '';

      let key = 'THEMES_CREATE';
      let themesName = showNewThemes;
      if( showEditThemes ){
        key = 'THEMES_EDIT';
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
      'theme_id': itemId
    };
    let seq = this.api.post('theme/remove', info).share();

    seq.subscribe((res: any) => {

      let message = '';
      this.translateService.get('THEMES_REMOVE').subscribe((value) => {
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
    let seq = this.api.post('course/themes', info).share();

    seq.subscribe((res: any) => {
      console.log( res );
      this.sieceList = res.data;
    });
    return seq;
  }

  openPageCreate(){
    this.navCtrl.push('CreateThemesFormPage',
      {
        'item': this.science,
        'science': this.science,
        'group_id': this.groupId,
        'course_id': this.science.id,
        'group': this.group
      }
    );
  }

  openItem(item: any){
    this.navCtrl.push('CreateThemesFormPage', {
      'item': item,
      'edit': true,
      'science': this.science,
      'group_id': this.groupId,
      'course_id': this.science.id,
      'group': this.group
    });
  }

  backToScience(){
    this.navCtrl.setRoot('ItemDetailPage', {
      'item': this.group
    });
  }
}
