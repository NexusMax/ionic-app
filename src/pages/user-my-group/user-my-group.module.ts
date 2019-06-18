import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMyGroupPage } from './user-my-group';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    UserMyGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMyGroupPage),
    TranslateModule.forChild()
  ],
})
export class UserMyGroupPageModule {}
