import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'login'}
  },
];

@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }
