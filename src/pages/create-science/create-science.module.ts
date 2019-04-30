import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CreateSciencePage } from './create-science';

@NgModule({
  declarations: [
    CreateSciencePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSciencePage),
    TranslateModule.forChild()
  ],
})
export class CreateSciencePageModule {}
