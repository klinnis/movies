import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NumberInput} from "@angular/cdk/coercion";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

export interface CollectionData {

  key: string;
  desc: string;
  id: Number;
}

let collections_data: CollectionData[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  destroy: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = new FormGroup({
  search: new FormControl('',Validators.minLength(3))});

  get f(){
    return this.form.controls;
  }

  displayedColumns: string[] = ['poster_path','title','vote_average','details', 'collection'];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource<CollectionData>(collections_data);
  baseImageUrl = 'https://image.tmdb.org/t/p/original';
  collections: any[] = [];
  empty: boolean = true;
  length: NumberInput = 0;
  input_error = '';
  count: any = 0;
  length_collections: any = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator;
  }

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.home_movies.pipe(takeUntil(this.destroy)).subscribe(result => {
      this.length = result;
    });
  }

  checkAlphaNumeric(text: any){
    let inp = String.fromCharCode(text);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else{
      return false;
    }
  }

  onMoviesSearch(){
    this.apiService.getMovies(this.form.value.search).pipe(takeUntil(this.destroy)).subscribe((result:any) => {
    this.dataSource.data = result.results;
    this.length = result.total_results;
    this.apiService.home_movies.next(this.length);
    this.input_error = '';
    });
  }

  findMovie(element: any){
    this.router.navigateByUrl('movie-details/'+element);
  }

  addToCollection(element: any) {
    collections_data = [];
    this.collections = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      if(localStorage.key( i ) !== 'movieId'){
        const title = localStorage.key(i);
        const desc = JSON.parse(''+localStorage.getItem(''+localStorage.key( i )));
        this.collections.push({key:title, desc: desc.desc, id: element.id});
      }
    }
    this.collections.forEach(res=> {
    this.length_collections += 1;
    collections_data.push({ key: res.key, desc: res.desc,id: element.id});
    });
    this.apiService.collections_dialog.next(this.length_collections);
    this.dataSource1.data = collections_data;
    // @ts-ignore
    this.dataSource1.paginator = this.paginator;
    this.dialog.open(CollectionDialog,{
      width: '800px',
      height: '600px'
    });
  }
}

@Component({
  selector: 'app-collection-dialog',
  templateUrl: 'collectionDialog.html',
})
export class CollectionDialog {

  empty: Boolean = false;
  dataSource1 = new MatTableDataSource<CollectionData>(collections_data);
  displayedColumns: string[] = ['title','add'];
  baseImageUrl = 'https://image.tmdb.org/t/p/original';
  destroy: Subject<boolean> = new Subject<boolean>();
  length_collections: any;
  key: any;

  ngOnInit() {
    this.apiservice.flagEmpty.pipe(takeUntil(this.destroy)).subscribe(value => {
    this.empty = value;
    });
    this.dataSource1 = new MatTableDataSource(collections_data);
    this.dataSource1.data = collections_data;
    this.apiservice.collections_dialog.pipe(takeUntil(this.destroy)).subscribe(result => {
    this.length_collections = result;
    });
  }

  constructor(
    public dialogRef: MatDialogRef<CollectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CollectionData, private apiservice: ApiService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  addToLocalStorage(member: any,id: any, key: any, desc:any) {
    member.disableButton = !member.disableButton;
    let parsed_array1:any[] = [];
    let parsed_array2:any[] = [];
    this.apiservice.getOneMovie(id).pipe(takeUntil(this.destroy)).subscribe((res: any) => {
    const parsed = JSON.parse(''+localStorage.getItem(''+key));
    parsed_array2 = JSON.parse(''+localStorage.getItem(''+key));
    let data = [{
      id: id,
      title: res.title,
      desc: desc,
      overview: res.overview,
      poster_path: this.baseImageUrl+res.poster_path,
      budget: res.budget,
      release_date: res.release_date,
      revenue: res.revenue,
      vote_average: res.vote_average,
      vote_count: res.vote_count,
      spoken_languages: res.spoken_languages[0].english_name}];
      parsed_array1.push(data);
      if(parsed.desc == undefined){
        let duplicates = false;
        parsed_array2.forEach((element) => {
        if(element[0].id == data[0].id){
          duplicates = true;
        }
       });
        if(!duplicates) {
          parsed_array2.push(data);
        }
        localStorage.setItem(''+key,JSON.stringify(parsed_array2));
     }
      else {
        localStorage.setItem(''+key,JSON.stringify(parsed_array1));
        }

    });
  }

}







