import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyCoursesThemesPage } from './user-my-courses-themes';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyCoursesThemesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyCoursesThemesPage),
    TranslateModule.forChild()
  ],
})
export class UserMyCoursesThemesPageModule {}
