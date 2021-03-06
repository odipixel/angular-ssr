import { Component, OnInit,Input  } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpService} from "../services/http.service";
import { Router,ActivatedRoute  } from '@angular/router';



@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {
  launchYears=[];
  successfulLaunch=[];
  successfulLanding=[];
  @Input() launchData: any;
  launchParams: any;
  yearBtnClicked:any;
  constructor(private router:Router,private apiService:HttpService) { }

  ngOnInit(): void {
    this.launchYears=environment.filters.launchYear;
    this.successfulLaunch=environment.filters.successfulLaunch;
    this.successfulLanding=environment.filters.successfulLanding;
  }
 checkEveryFilter(){

 }

  getLaunchYear(year){
        this.yearBtnClicked=year;
         this.router.navigate(['launches'], { queryParams: { limit: environment.apiLimit,launch_year:year }, queryParamsHandling: 'merge' }).then(nav=>{
            // true if navigation is successful
             this.apiService.getLaunchWithYear(year).subscribe((res)=>{
               this.launchData=res;
               this.apiService.setData(this.launchData);
               }); 
           }, err => {
             console.error(err) // when there's an error
           });
      
    }


   

  getSuccessfulLaunch(isSuccessfulLaunch){
   
    this.router.navigate(['launches'], { queryParams: { limit: environment.apiLimit,launch_success:isSuccessfulLaunch }, queryParamsHandling: 'merge' }).then(nav=>{
      // true if navigation is successful
       this.apiService.getLaunchSuccess(isSuccessfulLaunch).subscribe((res)=>{
         this.launchData=res;
         this.apiService.setData(this.launchData);
       }); 
     }, err => {
       console.error(err) // when there's an error
     });
   
  }
  getSuccessfulLanding(isSuccessfulLanding){
     this.router.navigate(['launches'], { queryParams: { limit: environment.apiLimit,land_success:isSuccessfulLanding }, queryParamsHandling: 'merge' }).then(nav=>{
      // true if navigation is successful
       this.apiService.getLandSuccess(isSuccessfulLanding).subscribe((res)=>{
         this.launchData=res;
         this.apiService.setData(this.launchData);
       }); 
     }, err => {
       console.error(err) // when there's an error
     });
  }
  
  getLaunchSuccessWithYear(isSuccessfulLaunch,launchYear){
    this.router.navigate(['launches'], { queryParams: { limit: environment.apiLimit,launch_success:isSuccessfulLaunch,launch_year:launchYear}, queryParamsHandling: 'merge' }).then(nav=>{
      // true if navigation is successful
       this.apiService.getLaunchSuccessWithYear(isSuccessfulLaunch,launchYear).subscribe((res)=>{
         this.launchData=res;
         this.apiService.setData(this.launchData);
       }); 
     }, err => {
       console.error(err) // when there's an error
     });
  }

  getLandSuccessWithYear(isSuccessfulLanding,launchYear){
    this.router.navigate(['launches'], { queryParams: { limit: environment.apiLimit,land_success:isSuccessfulLanding,launch_year:launchYear }, queryParamsHandling: 'merge' }).then(nav=>{
      // true if navigation is successful
       this.apiService.getLandSuccessWithYear(isSuccessfulLanding,launchYear).subscribe((res)=>{
         this.launchData=res;
         this.apiService.setData(this.launchData);
       }); 
     }, err => {
       console.error(err) // when there's an error
     });
  }


  getAllFilter(isSuccessfulLaunch,isSuccessfulLanding,launchYear){
    this.router.navigate(['launches'], { queryParams: { limit: environment.apiLimit,launch_success:isSuccessfulLaunch,land_success:isSuccessfulLanding,launch_year:launchYear }, queryParamsHandling: 'merge' }).then(nav=>{
      // true if navigation is successful
       this.apiService.getAllFilter(isSuccessfulLaunch,isSuccessfulLanding,launchYear).subscribe((res)=>{
         this.launchData=res;
         this.apiService.setData(this.launchData);
       }); 
     }, err => {
       console.error(err) // when there's an error
     });
  }
  
 
}
