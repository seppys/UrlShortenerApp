import { Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { CrearComponent } from './urls/crear/crear.component';
import { HomeComponent } from './home/home.component';
import { PopularListComponent } from './urls/popular-list/popular-list.component';

export const routes: Routes = [
    {path: 'urls/new', component: CrearComponent},
    {path: 'urls/popular', component: PopularListComponent},
    {path: 'account/register', component: RegisterComponent},
    {path: 'account/login', component: LoginComponent},
    {path: '', component: HomeComponent},
    {path: '*', component: HomeComponent}
];
