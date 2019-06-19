import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Auth, User} from "../../providers";


import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root, Tab6Root } from '../';

/**
 * Generated class for the MainBottomMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-bottom-menu',
  templateUrl: 'main-bottom-menu.html',
})

@Component({
  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})


export class MainBottomMenuPage {

  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = "TAB1_TITLE";
  tab2Title = "TAB2_TITLE";
  tab3Title = "TAB3_TITLE";

  page;

  constructor(
    public navCtrl: NavController,
    public translateService: TranslateService,
    public navParams: NavParams,
    public auth: Auth,
    public user: User,
  ) {

    if( !this.user.isTeacher() ){
      this.tab1Root = Tab4Root;
      this.tab2Root = Tab5Root;
      this.tab3Root = Tab6Root;
      this.tab1Title = "TAB4_TITLE";
      this.tab2Title = "TAB5_TITLE";
      this.tab3Title = "TAB6_TITLE";
    }

    this.page = this.navParams.get('page');

    translateService.get([this.tab1Title, this.tab2Title, this.tab3Title]).subscribe(values => {
      this.tab1Title = values[this.tab1Title];
      this.tab2Title = values[this.tab2Title];
      this.tab3Title = values[this.tab3Title];
    });

    this.navCtrl.push(this.page);
  }

}
