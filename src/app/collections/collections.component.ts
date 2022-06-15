import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  data: any[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0, len = localStorage.length; i < len; i++) {
      let tempData = [];
      if(localStorage.key( i ) !== 'movieId'){
        this.data.push(localStorage.key( i ));
      }
      }
    }
  }


