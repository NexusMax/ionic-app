import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyRatingPage } from './user-my-rating';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyRatingPage),
    TranslateModule.forChild()
  ],
})
export class UserMyRatingPageModule {}
