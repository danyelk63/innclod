import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@httpServices';
import { ITask, UUID } from '@models';
import { DeleteDialogComponent } from '@components';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class TasksListComponent {
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  tasks: ITask[] = [];

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tasksService.get(this.route.snapshot.params['id']).subscribe({
      next: (response: ITask[]) => {
        this.tasks = response;
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(JSON.stringify(error), "OK", {
          duration: 3000
        });
      }
    })
  }

  delete(title: string, id: UUID) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: title }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.tasksService.delete(id).subscribe({
          next: (response: ITask) => {
            this.snackBar.open(`Eliminado ${response.title} con éxito`, "OK");
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
    this.router.navigate(["/tasks/new"]);
  }

  edit(id: UUID) {
    this.router.navigate([`/tasks/${id}`]);
  }

}
