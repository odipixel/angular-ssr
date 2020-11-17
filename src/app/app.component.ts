import { Component,OnInit, Inject,PLATFORM_ID,ViewChild } from '@angular/core';
import { environment } from './../environments/environment';
import {Meta } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = environment.title;
  developedBy=environment.developedBy;
  launchData:any;
  pageTitle:any;

  constructor(private route: ActivatedRoute,private metaTagService: Meta) {}

  ngOnInit() {

    this.pageTitle = this.route.snapshot.data['launches'];
    
    // SEO metadata
     this.metaTagService.addTags([
      { name: 'keywords', content: 'Angular Server Side Rendering,SSR,Angular,Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Kishore Mallick' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '16-11-2020', scheme: 'DD-MM-YYYY' },
      { charset: 'UTF-8' }
    ]);


    // Twitter metadata
    this.metaTagService.addTag({name: 'twitter:card', content: 'summary'});
    this.metaTagService.addTag({name: 'twitter:site', content: '@ServerSideRendering'});
    this.metaTagService.addTag({name: 'twitter:title', content: this.pageTitle});
    this.metaTagService.addTag({name: 'twitter:description', content: 'This page describes Angular Server Side Rendering'});
    this.metaTagService.addTag({name: 'twitter:text:description', content: 'This page describes Angular Server Side Rendering'});
    this.metaTagService.addTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628232?v=3&s=200'});
  }

 

}
