import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AddItemPage } from '../add-item/add-item';
import { EditItemPage } from '../edit-item/edit-item';
import { ItemDetailPage } from '../item-detail/item-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {
    this.dataService.getData().then((todos) => {
      if(todos) {
        this.items = todos;
      }
    });
  }

  ionViewDidLoad() {
  }

  addItem() {
    const addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if(item) {
        this.saveItem(item);
      }
    });

    addModal.present();
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }

  updateItem(newItem, oldItem) {
    const index = this.items.findIndex(obj => obj.title === oldItem.title)

    this.items[index] = newItem
    this.dataService.save(this.items);
  }

  deleteItem(itemTitle) {
    this.items.splice(this.items.findIndex(obj => obj.title === itemTitle), 1);
    this.dataService.save(this.items);
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  editItem(item) {
    const editModal = this.modalCtrl.create(EditItemPage, {
      item: item
    });

    editModal.onDidDismiss((newItem, oldItem) => {
      if(newItem) {
        this.updateItem(newItem, oldItem);
      }
    });

    editModal.present();
  }
}
