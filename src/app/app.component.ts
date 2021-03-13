import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from './service/auth.service';

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Vision', url: '/iframe-page/vision', icon: 'eye' },
    { title: 'Biography', url: '/iframe-page/biography', icon: 'body' },
    { title: 'News', url: '/iframe-page/news', icon: 'newspaper' },
    { title: 'Gallery', url: '/iframe-page/gallery', icon: 'images' },
    { title: 'Contacts', url: '/contacts', icon: 'people' },
    { title: 'Write To Us', url: '/iframe-page/write_to_us', icon: 'pencil' },
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

    this.user$ = this.auth.authState$.pipe(
      filter(user => !!user),
      map(user => user.uid),
      tap(console.log),
      switchMap(uid => this.auth.getUser(uid).pipe(take(1))),
      tap(console.log),
    );

    this.platform.ready().then(() => {

      this.menu.enable(false);

      this.statusBar.styleDefault();
      this.statusBar.styleLightContent();

    });

  }
}
