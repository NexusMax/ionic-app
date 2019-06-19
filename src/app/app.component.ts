import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages';
import { Settings } from '../providers';
import {CreateSciencePage} from "../pages/create-science/create-science";
import { User } from "../providers";

@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ 'MOBILE' | translate }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{ p.title | translate }}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'ABOUT', component: 'AboutPage', page: 'MainBottomMenuPage' },
    { title: 'CONTACT', component: 'ContactPage', page: 'MainBottomMenuPage' },
    { title: 'LOGOUT', component: 'LogoutPage', page: 'MainBottomMenuPage' }
  ];

  constructor(
    private translate: TranslateService,
              platform: Platform,
              settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private user: User
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('ua');
    //const browserLang = this.translate.getBrowserLang();

    // if (browserLang) {
    //   if (browserLang === 'zh') {
    //     const browserCultureLang = this.translate.getBrowserCultureLang();
    //
    //     if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
    //       this.translate.use('zh-cmn-Hans');
    //     } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
    //       this.translate.use('zh-cmn-Hant');
    //     }
    //   } else {
    //     this.translate.use(this.translate.getBrowserLang());
    //   }
    // } else {
    //   this.translate.use('ua'); // Set your language here
    // }
    this.translate.use('ua');

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }
}
