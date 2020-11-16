import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { LaunchesComponent } from './launches.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpService} from "../../services/http.service";
describe('LaunchesComponent', () => {
  let component: LaunchesComponent;
  let fixture: ComponentFixture<LaunchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ LaunchesComponent ],
      providers: [HttpService, HttpClientModule]
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

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
   });

   it('should have getAllLaunches function', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service.getAllLaunches).toBeTruthy();
   });
  
});
