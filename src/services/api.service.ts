import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  flagEmpty = new BehaviorSubject<Boolean>(false);
  baseApiUrl = 'https://api.themoviedb.org/3/';
  apiKey = '?api_key=85204a8cc33baf447559fb6d51b18313';
  collections_dialog = new BehaviorSubject<Number>(0);
  home_movies = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient) { }

  getMovies(event: any){
    return this.http.get(this.baseApiUrl+'search/movie'+this.apiKey+'&query='+event);
  }

  getOneMovie(id: any) {
    return this.http.get(this.baseApiUrl+'movie/'+id+this.apiKey);
  }

  createSession() {
    return this.http.get(this.baseApiUrl+'authentication/guest_session/new'+this.apiKey);
  }

  postReview(rate: any, movieId:any, sessionId: any) {
    return this.http.post(this.baseApiUrl+'movie/'+movieId+'/rating'+this.apiKey+'&guest_session_id='+sessionId,{value: rate});
  }

}
