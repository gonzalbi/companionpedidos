import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {LoginPage} from "../login/login";
import {ListapedidosPage} from "../listapedidos/listapedidos";
// import 'rxjs/add/operator/map'
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    us_id;
    us_name;
    pedidos;
    loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http : HttpClient,public alertCtrl: AlertController) {
    if(this.navCtrl['rootParams']){
        this.us_id = this.navCtrl['rootParams'].resp.us_id
        this.us_name = this.navCtrl['rootParams'].resp.us_name

    }else{
        this.us_id = this.navParams.data.login_data.us_id;
        this.us_name = this.navParams.data.login_data.us_name;
    }
        this.loading = true
  }

  ionViewDidLoad() {

      let div = document.getElementById("console_log_home") as HTMLDivElement;
      this.traerPedidos();

  }

  getItemList(titulo,p_id){
    this.navCtrl.push(ListapedidosPage,{titulo : titulo,p_id : p_id,us_id : this.us_id})
  }

  traerPedidos(){
      this.http.post("http://companionpedidos.forecastia.com/api/getPedidos:8080",{us_id : this.us_id},{})
          // .map(resp => {this.pedidos = resp})
          .subscribe(resp => {
          console.log(resp)
          this.pedidos =  resp
      },error => {
          console.log(error)
          this.pedidos = [];
      })
      this.loading = false
  }

  logOut(){
      delete this.navCtrl['rootParams']
      this.navCtrl.setRoot(LoginPage)
  }


    addItemPrompt(p_id){
        const prompt = this.alertCtrl.create({
            title: 'Agregar Morfi',
            inputs: [
                {
                    name: 'item',
                    placeholder: 'Pedido'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Guardar Item',
                    handler: data => {
                        this.addItem(data,p_id)
                    }
                }
            ]
        });
        prompt.present();
    }

    addPedido(){
        const prompt = this.alertCtrl.create({
            title: 'Agregar Pedido',
            inputs: [
                {
                    name: 'pedido',
                    placeholder: 'Pedido'
                },
                // {
                //     name: 'lugar',
                //     placeholder: 'Lugar'
                // },
                {
                    name: 'hora',
                    placeholder: 'Hora',
                    type : 'time',
                }],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Guardar Pedido',
                    handler: data => {
                        this.savePedido(data)
                    }
                }
            ]
        });
        prompt.present();
    }


    savePedido(data){

        let body = {
            p_id : -1,
            p_ya_pedido : false,
            p_responsable : this.us_id,
            p_lugar : data.lugar,
            p_nombre : data.pedido,
            p_time : data.hora,
            p_items : [],
            p_items_remove : []
    }

        this.http.post("http://companionpedidos.forecastia.com/api/savePedido:8080",body,{})
            .subscribe(resp => {
            console.log("lesto")
                this.traerPedidos();
            },error => {
            console.log("lesto")
                this.traerPedidos();

            })
        this.pedidos = [];

    }

    removePedido(pedido){

        this.http.post("http://companionpedidos.forecastia.com/api/removePedido:8080",pedido,{})
            .subscribe(resp => {
                console.log("lesto")
            },error => {
                console.log("error")
        })

        let index_p;

        this.pedidos.forEach(function (p,id) {
            if(p.p_id == pedido.p_id) index_p = id;
        });

        this.pedidos.splice(index_p,1);
    }


    addItem(data,p_id){

        let p_item = [];
        p_item[0] = {
                pi_id : null,
                us_id : this.us_id,
                pi_nombre_item : data.item,
                pi_tarjeta_enviada: false,
                pi_usuario_pedido : this.us_id,
                pi_usuario_pedido_nombre : this.us_name,
                pi_p_id : -1,
                pi_excedente : null,
            };


        let index = 0;

        this.pedidos.forEach(function (p,id) {
            if(p.p_id == p_id) index = id;
        });

        this.pedidos[index].p_items = p_item;

        let body ={
            pedido : this.pedidos[index],
            us_id : this.us_id,
            p_id : p_id
        }

        this.http.post("http://companionpedidos.forecastia.com/api/addItems:8080",body,{})
            .subscribe(resp => {
                console.log("lesto")
            },error => {
                console.log("error")
            })

    }

}



