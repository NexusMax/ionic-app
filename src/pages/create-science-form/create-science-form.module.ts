import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateScienceFormPage } from './create-science-form';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CreateScienceFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateScienceFormPage),
    TranslateModule.forChild()
  ],
})
export class CreateScienceFormPageModule {}
