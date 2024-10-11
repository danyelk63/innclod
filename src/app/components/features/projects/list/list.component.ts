import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProjectsService } from '@httpServices';
import { IProject, UUID } from '@models';
import { AvatarModule } from 'ngx-avatars';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, AvatarModule, MatButtonModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ProjectListComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  projects: IProject[] = [];

  constructor(private projectsService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.projectsService.get().subscribe({
      next: (response: IProject[]) => {
        this.projects = response;
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
      this.router.navigate([`/projects/${id}/tasks`]);
    }
  }

  delete(title: string, id: UUID) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: title}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.projectsService.delete(id).subscribe({
          next: (response: IProject) => {
            this.snackBar.open(`Eliminado ${response.name} con éxito`, "OK");
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open(JSON.stringify(error), "OK", {
              duration: 3000
            });
          }
        });
      }
    })
  }

  create() {
    this.router.navigate(["/projects/new"]);
  }

  edit(id: UUID) {
    this.router.navigate([`/projects/${id}`]);
  }
}
