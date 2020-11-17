import { inject, TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule ,HttpTestingController} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.prod';
import { HttpResponse } from '@angular/common/http';
describe('HttpService', () => {
  let service: HttpService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        
       ],
       providers: [
        { provide: environment.apiUrl, useValue: 'https://api.spaceXdata.com/v3/launches?limit=8' },
        HttpService
      ]
    });
    service = TestBed.inject(HttpService);
  });

 

  it('Should use HTTP service and get all launches during page load', () => {
    const http = TestBed.inject(HttpTestingController);
    const url='https://api.spaceXdata.com/v3/launches?limit=8';
    let res;
    service.getAllLaunches().subscribe((response) => {
      res = response;
    });
    http.expectOne(url).event(new HttpResponse<boolean>({body: true}));
    
  
    //expect(service.getAllLaunches()).toEqual(res);
  });


});
