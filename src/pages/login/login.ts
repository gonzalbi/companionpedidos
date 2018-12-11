import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import { HTTPResponse } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

    @ViewChild('username') username;
    // @ViewChild('password') password;
    constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public http : HttpClient,private storage : Storage) {
    }

    login(){

      let div = document.getElementById("console_log") as HTMLDivElement;
      let user_name = this.username._value;

      let body ={
          name : user_name
      };

      this.storage.set('name',user_name);

      this.http.post("http://companionpedidos.forecastia.com:8080/api/login",body,{}).subscribe(resp => {
          this.navCtrl.setRoot(HomePage, {login_data : resp})
      },error => {
            console.log(error)
          this.navCtrl.setRoot(HomePage, {login_data : null})
      })

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }


    showAlert(title,subtitle) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }

}
