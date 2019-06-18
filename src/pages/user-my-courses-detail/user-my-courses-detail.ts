import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Api, Auth} from "../../providers";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the UserMyCoursesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses-detail',
  templateUrl: 'user-my-courses-detail.html',
})
export class UserMyCoursesDetailPage {

  course;

  courseInfo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth
  ) {
    this.course = navParams.get('course');

  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.getCoursesInfo();
  }

  getCoursesInfo(){
    let info = {
      'token': this.auth.getToken(),
      'course_id': this.course.id
    };
    let seq = this.api.get('student/course/get', info).share();

    seq.subscribe((res: any) => {
      this.courseInfo = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
