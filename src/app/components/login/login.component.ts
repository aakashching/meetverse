import { AfterContentInit, Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterContentInit {
loaded:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit(){
    
    this.loaded=true;
  }
  
}
