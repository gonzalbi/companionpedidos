import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  rootPageParams;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storage : Storage,http : HttpClient) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

        storage.get('name').then((name) => {
            if(name){

                let body = {
                  name : name
                }

                http.post("http://companionpedidos.forecastia.com/api/login",body,{}).subscribe(resp => {
                    console.log("home")
                    this.rootPage = HomePage
                    this.rootPageParams = {resp}
                },error => {
                    console.log("login")
                    console.log(error)
                    this.rootPage = LoginPage
                })


            }else{
                this.rootPage = LoginPage
            }
        })

    });
  }
}



