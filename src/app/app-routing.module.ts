import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {CreateCollectionComponent} from "./create-collection/create-collection.component";
import {CollectionsComponent} from "./collections/collections.component";
import {MoviesComponent} from "./movies/movies.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movie-details/:id', component: MovieDetailsComponent},
  {path: 'movies/collections/create', component: CreateCollectionComponent},
  {path: 'movies/collections', component: CollectionsComponent},
  {path: 'movies/collections/collection-movies/:key', component: MoviesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
