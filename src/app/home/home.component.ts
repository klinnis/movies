import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NumberInput} from "@angular/cdk/coercion";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface PeriodicElement {
  poster_path: string;
  title: string;
  vote_average: Number;
  id: Number;
}

export interface CollectionData {

  key: string;
  desc: string;
  message: string;
  id: Number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
let collections_data: CollectionData[] = [];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  form: FormGroup = new FormGroup({
    search: new FormControl('',Validators.minLength(3))});

  get f(){
    return this.form.controls;
  }


  displayedColumns: string[] = ['poster_path','title','vote_average','details', 'collection'];
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource<CollectionData>(collections_data);
  baseImageUrl = 'https://image.tmdb.org/t/p/original';
  movies: any;
  collections: any[] = [];
  empty: boolean = true;
  width: string = '600';
  height: string = '100';
  length: NumberInput = 0;
  input_error = '';


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource1.paginator = this.paginator;
  }

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  checkAlpaNumeric(text: any){
    let inp = String.fromCharCode(text);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else{
      return false;
    }
  }

  onMoviesSearch(){

      this.apiService.getMovies(this.form.value.search).subscribe((result:any) => {
        this.dataSource.data = result.results;
        this.length = result.total_results;
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
        this.collections.push({message: 'No Collections',key:title, desc: desc.desc, id: element.id});
      }
    }
    this.collections.forEach(res=> {
      collections_data.push({message: res.message, key: res.key, desc: res.desc,id: element.id});
    });
    this.dataSource1.data = collections_data;
    // @ts-ignore
    this.dataSource1.paginator = this.paginator;
    this.dialog.open(CollectionDialog,{
      width: '800px',
      height: '500px'
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
  olddata: any[] = [];


  ngOnInit() {
    this.apiservice.flagEmpty.subscribe(value => {
        this.empty = value;
    });

    this.dataSource1 = new MatTableDataSource(collections_data);
    this.dataSource1.data = collections_data;
  }

  constructor(
    public dialogRef: MatDialogRef<CollectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CollectionData, private apiservice: ApiService, private router: Router,public dialog: MatDialog ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  createCollection() {
     this.router.navigateByUrl('movies/collections/create');
     this.onNoClick();
  }

  addToLocalStorage(id: any, key: any, desc:any) {
    let parsed_array1:any[] = [];
    let parsed_array2:any[] = [];
    this.apiservice.getOneMovie(id).subscribe((res: any) => {
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
      parsed_array2.push(data);
      localStorage.setItem(''+key,JSON.stringify(parsed_array2));
      parsed_array2 = [];
    }
       else {
          localStorage.setItem(''+key,JSON.stringify(parsed_array1));
        }

    });
  }

}







