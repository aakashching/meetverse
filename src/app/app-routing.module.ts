import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { PreviewComponent } from './pages/preview/preview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: "register",
        loadChildren:()=>import("./register/register.module").then(m=>m.RegisterModule),
      },
      {
        path: "login",
        // component: LoginComponent,
        loadChildren:()=>import("./login/login.module").then((m)=>m.LoginModule)
      },
      {
        path:"status",
        loadChildren:()=>import("./status/status.module").then(m=>m.StatusModule)
      }
    ],

  }, {
    path: "preview",
    loadChildren: ()=>import("./preview/preview.module").then((m)=>m.PreviewModule)
  },{
    path:"meeting",
    loadChildren:()=>import("./meeting/meeting.module").then((m)=>m.MeetingModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
