import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CollectionDialog, HomeComponent} from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {DialogOverviewExampleDialog, MovieDetailsComponent} from './movie-details/movie-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import {MatCardModule} from "@angular/material/card";
import { CollectionsComponent } from './collections/collections.component';
import { MoviesComponent } from './movies/movies.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailsComponent,
    DialogOverviewExampleDialog,
    CollectionDialog,
    CreateCollectionComponent,
    CollectionsComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
