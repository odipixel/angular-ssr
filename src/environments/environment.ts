// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title:"SpaceX Launch Programs",
  developedBy:"Kishore Mallick",
  filters:{
    launchYear:["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"],
    successfulLaunch:[{
      key:true,
      value:"True"
    },{
      key:false,
      value:"False"
    }],
    successfulLanding:[{
      key:true,
      value:"True"
    },
    {
      key:false,
      value:"False"
    }]
  },
  apiUrl:"https://api.spaceXdata.com/v3/launches",
  apiLimit:8,
  apis:{
    getAllLaunches:function(url:any,limit:any){
      return `${url}?limit=${limit}`;
    },
    filters:{
      launchWithYear:function(url:any,limit:any,launchYear:any){
        return `${url}?limit=${limit}&launch_year=${launchYear}`;
      },
      launchSuccess:function(url:any,limit:any,isLaunchSuccess:any){
        return `${url}?limit=${limit}&launch_success=${isLaunchSuccess}`;
      },
      launchSuccessWithYear:function(url:any,limit:any,isLaunchSuccess:any,launchYear:any){
        return `${url}?limit=${limit}&launch_success=${isLaunchSuccess}&launch_year=${launchYear}`;
      },
      landSuccess:function(url:any,limit:any,isLandSuccess:any){
        return `${url}?limit=${limit}&land_success=${isLandSuccess}`;
      },
      landSuccessWithYear:function(url:any,limit:any,isLandSuccess:any,launchYear:any){
        return `${url}?limit=${limit}&land_success=${isLandSuccess}&launch_year=${launchYear}`;
      },
      all:function(url:any,limit:any,isLaunchSuccess:any,isLandSuccess:any,launchYear:any){
        return `${url}?limit=${limit}&launch_success=${isLaunchSuccess}&land_success=${isLandSuccess}&launch_year=${launchYear}`;
      }
  }
}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
