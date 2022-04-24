import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  title: string;
  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('item').title
    this.description = this.navParams.get('item').description
  }

  saveItem() {
    const oldItem = this.navParams.get('item')
    
    const newItem = {
      title: this.title,
      description: this.description
    };

    this.view.dismiss(newItem, oldItem);
  }

  close() {
    this.view.dismiss();
  }
}
