import { Routes } from '@angular/router';
import { LoginComponent } from '@coreComponents';
import { ProjectFormComponent, ProjectListComponent, TaskFormComponent, TasksListComponent } from '@components';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
    {path: 'projects/:id', component: ProjectFormComponent, canActivate: [AuthGuard]},
    {path: 'projects/new', component: ProjectFormComponent, canActivate: [AuthGuard]},
    {path: 'projects/:id/tasks', component: TasksListComponent, canActivate: [AuthGuard]},
    {path: 'tasks/:id', component: TaskFormComponent, canActivate: [AuthGuard]},
    {path: 'tasks/:id', component: TaskFormComponent, canActivate: [AuthGuard]},
];
