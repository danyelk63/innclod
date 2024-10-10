import { Routes } from '@angular/router';
import { LoginComponent } from '@coreComponents';
import { ProjectListComponent, TasksListComponent } from '@components';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
    {path: 'projects/:id/tasks', component: TasksListComponent, canActivate: [AuthGuard]},
];
