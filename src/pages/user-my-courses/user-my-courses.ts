import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Api, Auth} from "../../providers";
import {UserMyCoursesDetailPage} from "../user-my-courses-detail/user-my-courses-detail";

/**
 * Generated class for the UserMyCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-my-courses',
  templateUrl: 'user-my-courses.html',
})
export class UserMyCoursesPage {

  courses: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public api: Api,
    public auth: Auth,
  ) {
    this.courses = [
      { name: 'Мова', id: 1},
      { name: 'География', id: 2}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMyCoursesPage');
  }

  ionViewWillEnter(){
    //this.getCourses();
  }


  getCourses(){

    let info = {
      'token': this.auth.getToken(),
    };
    let seq = this.api.get('student/course/list', info).share();

    seq.subscribe((res: any) => {
      // console.log( res );
      this.courses = res.data;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  openCourse( course: any ){
    this.navCtrl.push('UserMyCoursesDetailPage', {
      course: course
    });
  }

}
