import { Routes } from '@angular/router';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { CrearComponent } from './urls/crear/crear.component';
import { HomeComponent } from './home/home.component';
import { PopularListComponent } from './urls/popular-list/popular-list.component';
import { UserUrlsListComponent } from './urls/user-urls-list/user-urls-list.component';
import { authGuard } from './_guards/auth.guard';
import { EditUserComponent } from './users/edit/edit-user/edit-user.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
    {path: 'urls/popular', component: PopularListComponent},
    {path: '', component: HomeComponent},
    { path: "",
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children:
        [
            {path: 'urls/new', component: CrearComponent},
            {path: 'urls/my-urls', component: UserUrlsListComponent},
            {path: 'account/edit', component: EditUserComponent, canDeactivate: [preventUnsavedChangesGuard]}
        ]
    },
    {path: 'account/register', component: RegisterComponent},
    {path: 'account/login', component: LoginComponent},
    {path: '**', component: HomeComponent}
];
