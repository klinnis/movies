import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  displayedColumns: string[] = ['image','title','vote','remove','details'];
  dataSource = new MatTableDataSource<any>();
  data: any;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  constructor(private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe((params) => {
      this.data =  JSON.parse(''+localStorage.getItem(params.get('key')!));
      this.dataSource.data = this.data;
    });
  }

  removeMovie(id: any) {
      let parsed_array1:any[] = [];
      this.actRoute.paramMap.subscribe((params) => {
      const collection = params.get('key')!;
      parsed_array1 = JSON.parse(''+localStorage.getItem(collection));
      parsed_array1.forEach((element,index) =>{
        if(element[0].id == id) parsed_array1.splice(index,1)});
      localStorage.setItem(collection,JSON.stringify(parsed_array1));
      this.dataSource.data = parsed_array1;
    });
  }

  detailsPage(id: any) {
    this.router.navigateByUrl('movie-details/'+id);
  }

}
