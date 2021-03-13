import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { HelperService } from '../service/helper.service';

import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';

interface AppContact {
  name: string,
  email: any,
  phone: any
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts;

  showSearch = false;

  keyword = '';

  mockContacts = [
    { name: 'Vinay', email: [], phone: [] },
    { name: 'Ram', email: [], phone: [] },
    { name: 'Shyam', email: [], phone: [] },
  ] as AppContact[];

  constructor(
    private contact: Contacts,
    private helper: HelperService,
    private plt: Platform
  ) { }

  ngOnInit() {
    if (this.plt.is('cordova')) {
      this.contact.find(['*']).then(res => {
        console.log('res : ', res);
        this.contacts = res.map(c => {
          return {
            name: c.displayName,
            email: c.emails,
            phone: c.phoneNumbers
          } as AppContact;
        });
      }).catch(err => {
        console.log('err : ', err);
      });
    } else {
      this.contacts = this.mockContacts;
    }
  }

  invite(contact: AppContact) {
    console.log(contact);

    if (contact.phone.length > 0 && !!contact.phone[0].value) {
      this.helper.inviteOnWhatsApp(contact.phone[0].value, environment.appUrl);  
    } else {
      this.helper.showToast('Number not found');
    }

    
  }

}
