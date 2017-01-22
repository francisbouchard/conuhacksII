import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the ImageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImageService {
  data: any;
  constructor(public http: Http) {
    console.log('Hello ImageService Provider');
  }

  public post(imageString, challenge) {

    let body = {image:imageString, challenge: challenge};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.post('https://tsnap-server.herokuapp.com/pictures/game', body, options)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
