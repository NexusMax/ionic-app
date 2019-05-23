import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPage } from './logout';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LogoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPage),
    TranslateModule.forChild()
  ],
})
export class LogoutPageModule {}
