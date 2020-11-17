import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LaunchesComponent } from './launches.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpService} from "../../services/http.service";
import { TransferState } from "@angular/platform-browser";
describe('LaunchesComponent', () => {
  let component: LaunchesComponent;
  let fixture: ComponentFixture<LaunchesComponent>;
 
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ LaunchesComponent ],
      providers: [HttpService, HttpClientModule,TransferState,{provide:ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  
});
