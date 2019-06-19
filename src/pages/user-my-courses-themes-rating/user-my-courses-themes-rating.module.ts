import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyCoursesThemesRatingPage } from './user-my-courses-themes-rating';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyCoursesThemesRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyCoursesThemesRatingPage),
    TranslateModule.forChild()
  ],
})
export class UserMyCoursesThemesRatingPageModule {}
