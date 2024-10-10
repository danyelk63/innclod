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
import { ITask } from '@models';
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
        console.log(this.tasks)
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(JSON.stringify(error), "OK", {
          duration: 3000
        });
      }
    })
  }

  delete(title: string) {

    console.log("asdf")
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {name: title}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result)
      if(result) {
        alert("delete");
      }
    })
  }

}
