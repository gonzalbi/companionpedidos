import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ListapedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listapedidos',
  templateUrl: 'listapedidos.html',
})
export class ListapedidosPage {

  title;
  p_id;
  items;
  us_id;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http : HttpClient,public alertCtrl: AlertController) {
    this.title = this.navParams.data.titulo;
    this.p_id = this.navParams.data.p_id;
    this.us_id = this.navParams.data.us_id;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListapedidosPage');
    this.getItemsPedido();
  }


  getItemsPedido(){


      let body = {
          p_id : this.p_id,
          onlyMine : false,
          us_id : this.us_id
      }

      this.http.post("http://companionpedidos.forecastia.com/api/getItemsPedido:8080",body,{})
          .subscribe(resp => {
              this.items =  resp['p_items'];
              console.log(this.items);
          },error => {
              console.log(error)
              this.items = [];
          })
  }

  removeItem(item){

      let pedido = {p_items_remove : [],p_items : []}
      pedido.p_items_remove.push(item);

      let body ={
          pedido : pedido,
          us_id : this.us_id,
          p_id : this.p_id
      }

      this.http.post("http://companionpedidos.forecastia.com/api/addItems:8080",body,{})
          .subscribe(resp => {
              let i;
              this.items.forEach(function (it,index) {
                  if(it.pi_id == item.pi_id){
                      i = index;
                  }
              })
              this.items.splice(i,1)
          },error => {
              console.log("error")
          })
  }

  editItemPrompt(item){
      const prompt = this.alertCtrl.create({
          title: 'Modificar Morfi',
          inputs: [
              {
                  name: 'item_val',
                  placeholder: 'Nombre item'
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
                  text: 'Modificar Item',
                  handler: data => {
                      this.editItem(data.item_val,item)
                  }
              }
          ]
      });
      prompt.present();
  }


  editItem(nombre_item,item){

      item.pi_nombre_item = nombre_item


      let pedido = {p_items_remove : [],p_items : []}
      pedido.p_items = [item];

      let body ={
          pedido : pedido,
          us_id : this.us_id,
          p_id : this.p_id
      }

      this.http.post("http://companionpedidos.forecastia.com/api/addItems:8080",body,{})
          .subscribe(resp => {
              console.log('lesto')
          },error => {
              console.log("error")
          })

  }


}
