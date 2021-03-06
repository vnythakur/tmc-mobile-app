import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './service/auth.service';

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Contacts', url: '/contacts', icon: 'people' },
    // { title: 'Report & Suggestion', url: '/reports', icon: 'book' },
    // { title: 'Support Rating', url: '/support-rating', icon: 'bulb' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  user$: Observable<any>;

  constructor(
    private auth: AuthService,
    private platform: Platform,
    private statusBar: StatusBar,
    private menu: MenuController,
  ) {

    this.user$ = this.auth.authState$;

    this.platform.ready().then(() => {

      this.menu.enable(false);

      this.statusBar.styleDefault();
      this.statusBar.styleLightContent();

    });

  }
}
