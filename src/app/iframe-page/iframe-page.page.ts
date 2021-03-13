import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-iframe-page',
  templateUrl: './iframe-page.page.html',
  styleUrls: ['./iframe-page.page.scss'],
})
export class IframePagePage implements OnInit {

  pageId: string;
  pageName: string;
  baseUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private helper: HelperService
  ) { 
    
    this.helper.showLoader();

    this.pageId = this.activatedRoute.snapshot.params.id;
    this.pageName = this.pageId.split('_').join(' ');
    this.baseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.iframeUrl[this.pageId]);
  }

  ngOnInit() {
  }

  pageLoaded() {
    this.helper.hideLoader();
  }
}
