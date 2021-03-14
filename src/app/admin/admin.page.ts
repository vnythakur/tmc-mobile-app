import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { MenuController } from '@ionic/angular';

import { AuthService } from '../service/auth.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  allUsers$;

  showSearch = false;

  keyword = '';
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private menu: MenuController,
    private socialSharing: SocialSharing,
    public helper: HelperService
  ) { 
    this.menu.enable(false);

    this.allUsers$ = this.auth.getAllUsers().valueChanges();
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout().then(() => this.router.navigateByUrl('/welcome'));
  }

  nl2br (str, is_xhtml) {
      if (typeof str === 'undefined' || str === null) {
          return '';
      }
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }

  open(user) {
    this.auth.selectedUser.next(user);
    this.router.navigateByUrl('/user-detail');
  }

}
