import { Routes } from '@angular/router';
import { LoginComponent } from '@coreComponents';
import { ProjectFormComponent, ProjectListComponent, TaskFormComponent, TasksListComponent } from '@components';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'projects', loadComponent: () => import("@components").then((m) => m.ProjectListComponent), canActivate: [AuthGuard]},
    {path: 'projects/:id', loadComponent: () => import("@components").then((m) => m.ProjectFormComponent), canActivate: [AuthGuard]},
    {path: 'projects/new', loadComponent: () => import("@components").then((m) => m.ProjectFormComponent), canActivate: [AuthGuard]},
    {path: 'projects/:id/tasks', loadComponent: () => import("@components").then((m) => m.TasksListComponent), canActivate: [AuthGuard]},
    {path: 'tasks/:id', loadComponent: () => import("@components").then((m) => m.TaskFormComponent), canActivate: [AuthGuard]},
    {path: 'tasks/:id', loadComponent: () => import("@components").then((m) => m.TaskFormComponent), canActivate: [AuthGuard]},
];
