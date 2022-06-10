import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, NgForm, FormBuilder, Validators, FormGroupDirective} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    desc: new FormControl('',Validators.required)});

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  get f(){
    return this.form.controls;
  }

  createCollection() {
     const title = this.form.value.title;
     const desc = this.form.value.desc;
     localStorage.setItem(title,JSON.stringify({desc: desc}));
     this.form.reset();
     this.router.navigateByUrl('movies/collections');
  }

}
