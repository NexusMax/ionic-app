import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {CreateThemesPage} from "./create-themes";

@NgModule({
  declarations: [
    CreateThemesPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateThemesPage),
    TranslateModule.forChild()
  ],
})
export class CreateThemesPageModule {}
