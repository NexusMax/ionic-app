import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyCoursesPage } from './user-my-courses';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyCoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyCoursesPage),
    TranslateModule.forChild()
  ],
})
export class UserMyCoursesPageModule {}
