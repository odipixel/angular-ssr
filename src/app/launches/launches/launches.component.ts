import { Component,OnInit, Inject,PLATFORM_ID,ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpService} from "../../services/http.service";
import {makeStateKey, TransferState,Meta } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { SidebarFilterComponent } from '../../../app/sidebar-filter/sidebar-filter.component';
const RESULT_KEY = makeStateKey<string>('spaceXData');
@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss']
})
export class LaunchesComponent implements OnInit {

  title = environment.title;
  developedBy=environment.developedBy;
  launchData:any;
  pageTitle:any;
  public result;
  private isServer: boolean;
  @ViewChild(SidebarFilterComponent) sideBar;

  constructor(private apiService:HttpService,
    private transferState: TransferState,@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute,private metaTagService: Meta) {
      this.isServer = isPlatformServer(platformId);
      apiService.apiData$.subscribe(data => this.launchData = data);
    }

  ngOnInit() {
    let spacexTransferStateKey = RESULT_KEY;
       
    if(this.transferState.hasKey(spacexTransferStateKey)) {
      this.launchData = this.transferState.get(spacexTransferStateKey, {});
      this.transferState.remove(spacexTransferStateKey);
  } else if (this.isServer){
     this.apiService.getAllLaunches().subscribe((res)=>{
      this.launchData=res;
      this.transferState.set(spacexTransferStateKey, this.launchData);
     }); 
  }

  

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
    this.metaTagService.updateTag({name: 'twitter:card', content: 'summary'});
    this.metaTagService.updateTag({name: 'twitter:site', content: '@ServerSideRendering'});
    this.metaTagService.updateTag({name: 'twitter:title', content: this.pageTitle});
    this.metaTagService.updateTag({name: 'twitter:description', content: 'This page describes Angular Server Side Rendering'});
    this.metaTagService.updateTag({name: 'twitter:text:description', content: 'This page describes Angular Server Side Rendering'});
    this.metaTagService.updateTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628232?v=3&s=200'});
  }


}
