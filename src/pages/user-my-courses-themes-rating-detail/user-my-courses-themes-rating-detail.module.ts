import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyCoursesThemesRatingDetailPage } from './user-my-courses-themes-rating-detail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyCoursesThemesRatingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyCoursesThemesRatingDetailPage),
    TranslateModule.forChild()
  ],
})
export class UserMyCoursesThemesRatingDetailPageModule {}
