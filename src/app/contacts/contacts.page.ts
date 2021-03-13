import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { HelperService } from '../service/helper.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts;

  constructor(
    // private contact: Contact
    private contact: Contacts,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.contact.find(['*']).then(res => {
      console.log('res : ', res);
      this.contacts = res.map(c => {
        return {
          name: c.displayName,
          email: c.emails,
          phone: c.phoneNumbers
        }
      });
    }).catch(err => {
      console.log('err : ', err);
    })
  }

  invite(contact) {
    console.log(contact);

    if (contact.phone.length > 0 && !!contact.phone[0].value) {
      this.helper.inviteOnWhatsApp(contact.phone[0].value, environment.appUrl);  
    } else {
      this.helper.showToast('Number not found');
    }

    
  }

}
