import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainBottomMenuPage } from './main-bottom-menu';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    MainBottomMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MainBottomMenuPage),
    TranslateModule.forChild()
  ],
})
export class MainBottomMenuPageModule {}
