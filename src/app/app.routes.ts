import { Routes } from '@angular/router';
import { LoginComponent } from '@coreComponents';
import { ProjectListComponent } from '@components';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: ProjectListComponent, canActivate: [AuthGuard]},
];
