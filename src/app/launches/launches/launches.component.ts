import { Component,OnInit, Inject,PLATFORM_ID,ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../services/http.service";
import {makeStateKey, TransferState,Meta } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SidebarFilterComponent } from '../../../app/sidebar-filter/sidebar-filter.component';

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
  @ViewChild(SidebarFilterComponent) sideBar;

  constructor(private http: HttpClient,private apiService:HttpService,
    private transferState: TransferState,@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute,private metaTagService: Meta) {}

  ngOnInit() {

    

    let spacexTransferStateKey = makeStateKey<any>("spaceXData");
       // Server only code.
  
    if(this.transferState.hasKey(spacexTransferStateKey)) {
      this.launchData = this.transferState.get(spacexTransferStateKey, {});
      this.transferState.remove(spacexTransferStateKey);
  } else {
    this.apiService.getAllLaunches().subscribe((res)=>{
      this.launchData=res;
      this.transferState.set(spacexTransferStateKey, this.launchData);
     }); 
  }
    
    if (isPlatformServer(this.platformId)) {
    }
    if (isPlatformBrowser(this.platformId)) {
    
   }


    this.pageTitle = this.route.snapshot.data['launches'];
    
    // SEO metadata
     this.metaTagService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Kishore Mallick' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '07-11-2020', scheme: 'DD-MM-YYYY' },
      { charset: 'UTF-8' }
    ]);


    // Twitter metadata
    this.metaTagService.addTag({name: 'twitter:card', content: 'summary'});
    this.metaTagService.addTag({name: 'twitter:site', content: '@AngularUniv'});
   // this.metaTagService.addTag({name: 'twitter:title', content: this.course.description});
   // this.metaTagService.addTag({name: 'twitter:description', content: this.course.description});
  //  this.metaTagService.addTag({name: 'twitter:text:description', content: this.course.description});
    this.metaTagService.addTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200'});
  }
  ngAfterViewInit() {
    this.launchData = this.sideBar.launchData;
  }

}
