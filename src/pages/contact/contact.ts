import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth, User} from "../../providers";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  email: string;
  message: string;

  private loginErrorString: string;
  private loginSuccessString: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public auth: Auth,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private user: User
  ) {

    this.translateService.get('CONTACT_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.translateService.get('CONTACT_SUCCESS').subscribe((value) => {
      this.loginSuccessString = value;
    });
  }

  ionViewDidLoad() {
  }

  save(){

    let info = {
      'token': this.auth.getToken(),
      'name': this.user.getUser().last_name + ' ' + this.user.getUser().first_name + ' '  + this.user.getUser().second_name,
      'email': this.email,
      'content': this.message
    };

    let seq = this.api.post('send', info).share();

    seq.subscribe((res: any) => {
      console.log( res );

      let toast = this.toastCtrl.create({
        message: this.loginSuccessString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
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
