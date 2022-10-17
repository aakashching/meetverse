import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild("reg",{static:false}) regForm:NgForm;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {
  }
  registerUser(){
    this.auth.signupUser(this.regForm.value).subscribe(data=>{
      if(data){
        console.log( "registered "+ data)
        this.router.navigate(["/login"])
      }
    })
  }

}
