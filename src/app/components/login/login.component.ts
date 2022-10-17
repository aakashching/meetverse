import { AfterContentInit, Component, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {
@ViewChild("login",{static:false}) loginForm:NgForm;
  loaded = false;
  password:boolean=false
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    // this.control
    console.log("login loaded")
  }
  ngAfterContentInit(){

    this.loaded = true;
  }
  onLogin(){
console.log(this.loginForm)
    this.auth.loginUser(this.loginForm.value).subscribe(data=>{
     
      this.auth.setUser(data)
      if(data){
        this.auth.setAuthentication(true)
        // alert("Success fully logged in");
        this.router.navigate(['/'])
      }
    });
  }

}
