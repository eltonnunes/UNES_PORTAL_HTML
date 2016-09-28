import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Video }            from './../models/video';
import { GlobalVariable }   from './../globals'

@Injectable()
export class VideosService {

  constructor (private http: Http) {}

  // URL to web API
  private VIDEOS_URL: string =  GlobalVariable.BASE_API_URL
                                + 'TbUniversidadeVideos/'
                                + GlobalVariable.TOKEN
                                + '/0/100/1/6/1?102=2015%';

  getVideos() : Observable<Video[]>{
      return this.http.get(this.VIDEOS_URL)
                      .map((res:Response) => res.json().Registros)
                      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  /*
  // Fetch all existing comments
   getComments() : Observable<Comment[]>{
       // ...using get request
       return this.http.get(this.API_URL)
                      // ...and calling .json() on the response to return data
                       .map((res:Response) => res.json())
                       //...errors if any
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

   }

   // Add a new comment
  addComment (body: Object): Observable<Comment[]> {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.post(this.API_URL, body, options) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  // Update a comment
  updateComment (body: Object): Observable<Comment[]> {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.put(`${this.API_URL}/${body['id']}`, body, options) // ...using put request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  // Delete a comment
  removeComment (id:string): Observable<Comment[]> {
      return this.http.delete(`${this.API_URL}/${id}`) // ...using put request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
  */


}
