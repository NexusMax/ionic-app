import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyCoursesThemesDetailPage } from './user-my-courses-themes-detail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyCoursesThemesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyCoursesThemesDetailPage),
    TranslateModule.forChild()
  ],
})
export class UserMyCoursesThemesDetailPageModule {}
