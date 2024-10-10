import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectsService } from '@httpServices';
import { IProject, UUID } from '@models';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, AvatarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ProjectListComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  projects: IProject[] = [];

  constructor(private projectsService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectsService.get().subscribe({
      next: (response: IProject[]) => {
        this.projects = response;
        console.log(this.projects)
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(JSON.stringify(error), "OK", {
          duration: 3000
        });
      }
    })
  }

  getInitials(name: string) {
    return (name.split(" ").map(name => name[0]).join("")).toUpperCase();
  }

  selectProject(id: UUID) {
    if(id) {
      this.router.navigate([`/projects/${id}/tasks`])
    }
  }
}
