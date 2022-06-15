import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

export interface DialogData {
  title: string;
  overview: string;
  poster_path: string;
  budget: Number;
  release_date: string;
  revenue: Number;
  vote_average: Number;
  vote_count: Number;
  spoken_languages: any;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {

  data: any;
  movie: any;
  baseImageUrl = 'https://image.tmdb.org/t/p/original';
  destroy: Subject<boolean> = new Subject<boolean>();
  constructor(public dialog: MatDialog, private actRoute: ActivatedRoute, private apiservice: ApiService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.apiservice.getOneMovie(params.get('id')!).pipe(takeUntil(this.destroy)).subscribe(movie => {
        this.movie = movie;
        const id = params.get('id');
        localStorage.setItem('movieId', JSON.stringify(id));
        this.dialog.open(DialogOverviewExampleDialog, {
          width: '800px',
          height: '650px',
          data: {title: this.movie.title,
                 overview: this.movie.overview,
                 poster_path: this.baseImageUrl+this.movie.poster_path,
                 budget: this.movie.budget,
                 release_date: this.movie.release_date,
                 revenue: this.movie.revenue,
                 vote_average: this.movie.vote_average,
                 vote_count: this.movie.vote_count,
                 spoken_languages: this.movie.spoken_languages[0].english_name}
        });
      });
    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  destroy: Subject<boolean> = new Subject<boolean>();
  voting: any = '';

  changeFn(e: any) {
    this.voting = e.target.value;
  }

  sendVote(vote: any) {
   this.apiservice.createSession().pipe(takeUntil(this.destroy)).subscribe((res: any)=> {
     const movieId = JSON.parse(''+localStorage.getItem('movieId'));
     this.apiservice.postReview(vote,movieId,res.guest_session_id).pipe(takeUntil(this.destroy)).subscribe((result: any) => {
       if(result.success){
         this.voting = 'Thank you!';
       } else {
         this.voting = 'Something went wrong!';
       }
     });
   });
  }

  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private apiservice: ApiService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
