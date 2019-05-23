import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatingPage } from './rating';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RatingPage,
  ],
  imports: [
    IonicPageModule.forChild(RatingPage),
    TranslateModule.forChild()
  ],
})
export class RatingPageModule {}
