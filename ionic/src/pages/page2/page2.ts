import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ChallengeService } from '../../providers/challenge-service';

// Import camera
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers: [ChallengeService]
})
export class Page2 {
  selectedItem: any;

  // This is the picture
  public base64Image: string;
  public challenge: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public challengeService: ChallengeService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.loadChallenge;

  }

  public takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = imageData;
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

}
