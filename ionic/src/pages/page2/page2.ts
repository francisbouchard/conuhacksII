import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ChallengeService } from '../../providers/challenge-service';
import { ImageService } from '../../providers/image-service';


// Import camera
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers: [ChallengeService, ImageService]
})
export class Page2 {
  selectedItem: any;

  // This is the picture
  public base64Image: string;
  public challenge: string;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public challengeService: ChallengeService, public imageService: ImageService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.loadChallenge();
  }

  public takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64,"+ imageData;
      this.sendPhoto(imageData);
    }, (err) => {
      console.log(err);
    });


  }

  public loadChallenge() {

    this.challengeService.load()
      .then(data => {
        this.challenge = data;

      })
  }

  public sendPhoto(image) {

    this.imageService.post(image, this.challenge)
      .then(data => {
        this.showAlert(data.points);
      })
  }

  public showAlert(points) {
    let alert = this.alertCtrl.create({
      title: 'Image Sent!',
      subTitle: 'Your Image has been submitted. You scored '+ points + '!',
      buttons: ['OK']
    });
    alert.present();
  }

}
