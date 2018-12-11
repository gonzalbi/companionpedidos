import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,Content } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListapedidosPage } from '../pages/listapedidos/listapedidos';

import { HTTP } from '@ionic-native/http';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';

// const firebaseAuth = {
//     apiKey: "AIzaSyDmEI6nhl009Gv10UpHzAdIL85EnfdfXdI",
//     authDomain: "companionpedidos.firebaseapp.com",
//     databaseURL: "https://companionpedidos.firebaseio.com",
//     projectId: "companionpedidos",
//     storageBucket: "companionpedidos.appspot.com",
//     messagingSenderId: "239063459252"
// };

// firebase.initializeApp(firebaseAuth);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListapedidosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      HttpClientModule,
      IonicStorageModule.forRoot({
          name: '__cplocal',
          driverOrder: ['indexeddb', 'sqlite', 'websql']})
      // AngularFireModule.initializeApp(firebaseAuth),
      // AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListapedidosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    HttpClientModule,
    HttpClient,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
