import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL: string = environment.apiUrl;
  apiLimit: number =environment.apiLimit;
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  constructor(private http: HttpClient) { }

  getLaunchWithYear(launchYear:any){
    return this.http.get(environment.apis.filters.launchWithYear(this.apiURL,this.apiLimit,launchYear));
  }

  getLaunchSuccess(isLaunchSuccess:any){
    return this.http.get(environment.apis.filters.launchSuccess(this.apiURL,this.apiLimit,isLaunchSuccess));
  }

  getLaunchSuccessWithYear(isLaunchSuccess:any,launchYear:any){
    return this.http.get(environment.apis.filters.launchSuccessWithYear(this.apiURL,this.apiLimit,isLaunchSuccess,launchYear));
  }

  getLandSuccess(isLandSuccess:any){
    return this.http.get(environment.apis.filters.landSuccess(this.apiURL,this.apiLimit,isLandSuccess));
  }

  getLandSuccessWithYear(isLandSuccess:any,launchYear:any){
    return this.http.get(environment.apis.filters.landSuccessWithYear(this.apiURL,this.apiLimit,isLandSuccess,launchYear));
  }

  getAllFilter(isLaunchSuccess:any,isLandSuccess:any,launchYear:any){
    return this.http.get(environment.apis.filters.all(this.apiURL,this.apiLimit,isLaunchSuccess,isLandSuccess,launchYear));
  }

  getAllLaunches(){
    return this.http.get(environment.apis.getAllLaunches(this.apiURL,this.apiLimit));
  }

  setData(data) { 
    this.apiData.next(data)
  }
}
