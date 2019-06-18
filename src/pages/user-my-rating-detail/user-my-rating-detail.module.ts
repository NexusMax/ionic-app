import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyRatingDetailPage } from './user-my-rating-detail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyRatingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyRatingDetailPage),
    TranslateModule.forChild()
  ],
})
export class UserMyRatingDetailPageModule {}
