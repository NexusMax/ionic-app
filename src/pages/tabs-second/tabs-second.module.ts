import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsSecondPage } from './tabs-second';

@NgModule({
  declarations: [
      TabsSecondPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsSecondPage),
    TranslateModule.forChild()
  ],
  exports: [
      TabsSecondPage
  ]
})
export class TabsSecondPageModule { }
