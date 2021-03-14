import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  user$: Observable<any>;

  constructor(
    private auth: AuthService,
    public helper: HelperService
  ) { 
    this.user$ = this.auth.selectedtUser$;
  }

  ngOnInit() {
  }

  nl2br (str, is_xhtml) {
      if (typeof str === 'undefined' || str === null) {
          return '';
      }
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }
}
