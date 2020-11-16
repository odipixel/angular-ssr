import { Component,OnInit, Inject,PLATFORM_ID,ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../services/http.service";
import {makeStateKey, TransferState,Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
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

  constructor(private http: HttpClient,private apiService:HttpService,
    private transferState: TransferState,@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute,private metaTagService: Meta,private router:Router) {
      this.isServer = isPlatformServer(platformId);
      apiService.apiData$.subscribe(data => this.launchData = data)
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
   
  }


}
