import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyCoursesDetailPage } from './user-my-courses-detail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyCoursesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyCoursesDetailPage),
    TranslateModule.forChild()
  ],
})
export class UserMyCoursesDetailPageModule {}
