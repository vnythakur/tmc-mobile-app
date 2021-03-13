import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AuthService } from '../service/auth.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  sub: Subscription;

  homeUrl = this.sannitize.bypassSecurityTrustResourceUrl(environment.iframeUrl.home);


  constructor(
    private router: Router,
    private auth: AuthService,
    private menu: MenuController,
    private socialSharing: SocialSharing,
    private helper: HelperService,
    public sannitize: DomSanitizer,
  ) {
    this.menu.enable(true);

    this.helper.showLoader();

    this.sub = this.auth.authState$.subscribe(auth => {
      if (!!auth && auth.email === environment.admin) {
        this.router.navigateByUrl('/admin');
        this.sub.unsubscribe();
      }
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.auth.logout().then(() => this.router.navigateByUrl('/welcome'));
  }

  share() {
    this.socialSharing.share(environment.shareContent, 'Vote for Jishu');
  }

  pageLoaded() {
    this.helper.hideLoader();
  }
}
