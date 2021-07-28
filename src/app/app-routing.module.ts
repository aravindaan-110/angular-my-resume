import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login/login.component';
import { ProfilepageComponent } from './login-component/profilepage/profilepage.component';
import { RegisterComponent } from './login-component/register/register.component';

const routes: Routes = [
 {path: '',component: LoginComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'profile',component: ProfilepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,RegisterComponent,ProfilepageComponent]
