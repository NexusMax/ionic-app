import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyGroupInformationPage } from './user-my-group-information';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyGroupInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyGroupInformationPage),
    TranslateModule.forChild()
  ],
})
export class UserMyGroupInformationPageModule {}
