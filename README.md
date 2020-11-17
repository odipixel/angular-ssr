# About the project

![Server Side Rendering](https://github.com/odipixel/angular-ssr/blob/main/src/assets/images/spacex.jpg)

[Click here for demo](https://spacex-ssrapp.herokuapp.com/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8 and Angular Universal(a technology that renders Angular Applications on the server).

A normal angular application executes in the browser,rendering pages in DOM but Angular Universal executes on the server and generates static pages which can be later bootstrapped on the client.

# SEO

As we know angular applications rely heavily on JavaScript and most search engines do not even execute JavaScript, In that case, we can render our application on the server and send back the rendered HTML. As the result, the crawler now can index our page properly.

Angular’s Meta service makes it easy to get or set meta tags depending on the current active route in your app. We have to import Meta Service form `@angular/platform-browser` and inject it in a component.

```sh
import { Meta } from '@angular/platform-browser';
 ```
You can use the `addTags` method to add multiple meta tags.

```sh
this.metaTagService.addTags([
      { name: 'keywords', content: 'Angular Server Side Rendering,SSR,Angular,Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Kishore Mallick' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '16-11-2020', scheme: 'DD-MM-YYYY' },
      { charset: 'UTF-8' }
    ]);
 ```

# Social Media Embedding

Most of social media sites ignore JavaScript, as well. So when a link to our page is shared, we would not get a desired result with our page in it. As they have no problem handling HTML, so it will be easy to render our embeded social media contents.

```sh
this.metaTagService.addTag({name: 'twitter:card', content: 'summary'});
this.metaTagService.addTag({name: 'twitter:site', content: '@ServerSideRendering'});
this.metaTagService.addTag({name: 'twitter:title', content: this.pageTitle});
this.metaTagService.addTag({name: 'twitter:description', content: 'This page describes Angular Server Side Rendering'});
this.metaTagService.addTag({name: 'twitter:text:description', content: 'This page describes Angular Server Side Rendering'});
this.metaTagService.addTag({name: 'twitter:image', content: 'https://avatars3.githubusercontent.com/u/16628232?v=3&s=200'});
 ```

# Browser Module

We have to import `BrowserModule.withServerTransition({appId: 'serverApp'})`.This method expects an object with a key called appId(string). This appId in our browser app module should match with one in the server app module.

```sh
 imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    HttpClientModule,
  ]
 ```
# Transfer State API
We will improve the efficiency of our app by creating the TransferState service, a key-value registry exchanged between the Node.js server and the application rendered in the browser.Normally, when we use angular universal without Transfer State API, the API that delivers the content, is hit twice. Once, when the server is rendering the page and second is, when the application is bootstrapped. We can overcome this problem by using Angular Transfer State API.We need to add the `BrowserTransferStateModule` to the AppModule.Then we need to inject this service in the component class.

```sh
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}
```

It can transfer data from the server side of the app to the browser side of the app.What we need to do is,first import `ServerTransferStateModule` on the server app and `BrowserTransferStateModule` on the browser app.

```sh
import {ServerTransferStateModule} from '@angular/platform-server';
@NgModule({
  imports: [
    AppModule,
    //Make sure the string matches
    BrowserModule.withServerTransition({
      appId: 'serverApp'
  }),
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```
```sh
@NgModule({
  declarations: [
    AppComponent,
    SidebarFilterComponent,
    LaunchesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserTransferStateModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We can detect if we are on the server or on the browser app by calling the `hasKey` method.

```sh
const RESULT_KEY = makeStateKey<string>('spaceXData');
...
 private isServer: boolean;

 constructor(private http: HttpClient,private apiService:HttpService,
    private transferState: TransferState,@Inject(PLATFORM_ID) private platformId: Object) {
      this.isServer = isPlatformServer(platformId);
}
...
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
  ```
## Data Sharing between components

The BehaviorSubject holds the value that needs to be shared with other components. These components subscribe to data which is simple returning the BehaviorSubject value without the functionality to change the value.A BehaviorSubject  can emit the current value.

* In http.service.ts `BehaviorSubject` is initialized.
```sh
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
```
* In sidebar-filter.component.ts you have to set the API responses.
```sh
this.apiService.setData(this.launchData);
```
* Component have to subscribe the data by returning the BehaviorSubject value
```sh
apiService.apiData$.subscribe(data => this.launchData = data);
```
## Built With

A list of commonly used resources in this project.

* [Angular](https://angular.io/)
* [Angular CLI](https://cli.angular.io/)
* [Angular Universal](https://angular.io/guide/universal)
* [Express](https://expressjs.com/)

## Getting Started

To get a local copy up and running please follow below simple steps.

### Prerequisites

* npm

```sh
npm install npm@latest -g
```
* angular cli
```sh
npm install -g @angular/cli
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/odipixel/angular-ssr.git
```
2. Install NPM packages
```sh
npm install
```

## Development server

To start this app on your local system,run  `npm run dev:ssr` command.
Open a browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build:ssr` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Deployment(Using Heroku Git)

Download and install the  * [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
 
1. Create a folder in your local directory.
2. Go to the directory that was created
If you haven't login already, log in to your Heroku account with below command line.

```sh
heroku login
```
2. Initialize the git in that folder using below command.

```sh
git init
```
3. Copy & Paste your files/folders from your angular-ssr folder to inside the created folder,except `.git` and node_module folder.
4. Set git remote heroku to  https://github.com/odipixel/angular-ssr.git using below command line.
```sh
heroku git:remote -a spacex-ssrapp
```
5. Deploy your changes
```sh
git add .
```
```sh
git commit -am "<Your commit message>"
```
```sh
git push heroku master
```
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

Distributed under the MIT License. See `LICENSE` for more information.

