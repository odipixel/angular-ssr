import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LaunchesComponent} from '../app/launches/launches/launches.component';

const routes: Routes = [
  {
    path: 'launches',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:launch_year',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:launch_success',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:land_success',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:launch_success/:land_success',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:launch_success/:land_success/:launch_year',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:launch_success/:launch_year',
    component: LaunchesComponent
  },
  {
    path: 'launches/:limit/:land_success/:launch_year',
    component: LaunchesComponent
  },
  {
    path: '', 
    redirectTo: 'launches', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
