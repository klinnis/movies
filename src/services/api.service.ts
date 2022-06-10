import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import {DialogData} from "../app/movie-details/movie-details.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  flagEmpty = new BehaviorSubject<Boolean>(false);
  localMovie = new Subject();
  searchText = new Subject();

  constructor(private http: HttpClient) { }

  getMovies(event: any){
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=85204a8cc33baf447559fb6d51b18313&query='+event);
  }

  getOneMovie(id: any) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=85204a8cc33baf447559fb6d51b18313');
  }

  createSession() {
    return this.http.get('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=85204a8cc33baf447559fb6d51b18313');
  }

  postReview(rate: any, movieId:any, sessionId: any) {
    return this.http.post('https://api.themoviedb.org/3/movie/'+movieId+'/rating?api_key=85204a8cc33baf447559fb6d51b18313&guest_session_id='+sessionId,{value: rate});
  }

}
