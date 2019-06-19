import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyInformationPage } from './user-my-information';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyInformationPage),
    TranslateModule.forChild()
  ],
})
export class UserMyInformationPageModule {}
