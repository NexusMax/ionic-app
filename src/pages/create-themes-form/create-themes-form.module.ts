import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import { CreateThemesFormPage} from "./create-themes-form";

@NgModule({
  declarations: [
    CreateThemesFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateThemesFormPage),
    TranslateModule.forChild()
  ],
})
export class CreateThemesFormPageModule {}
