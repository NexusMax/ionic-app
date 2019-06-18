import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import {Auth, User} from '../../providers';
import { Tab4Root, Tab5Root, Tab6Root } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;
  tab6Root: any = Tab6Root;

  tab4Title = " ";
  tab5Title = " ";
  tab6Title = " ";

  constructor(
      public navCtrl: NavController,
      public translateService: TranslateService,
      public auth: Auth,
      public user: User,
  ) {
    translateService.get(['TAB4_TITLE', 'TAB5_TITLE', 'TAB6_TITLE']).subscribe(values => {
      this.tab4Title = values['TAB4_TITLE'];
      this.tab5Title = values['TAB5_TITLE'];
      this.tab6Title = values['TAB6_TITLE'];
    });

      console.log(this.user.getUser());
  }
}
