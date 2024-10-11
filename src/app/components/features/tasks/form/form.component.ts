import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '@httpServices';
import { ITask } from '@models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class TaskFormComponent {
  private snackBar = inject(MatSnackBar);
  form: FormGroup;

  task: ITask | null = null;

  constructor(private formBuilder: FormBuilder, private tasksService: TasksService, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(null),
      title: this.formBuilder.control("", Validators.required),
      completed: this.formBuilder.control(false),
    });
  }

  ngOnInit(): void {
    console.log("asdf")
    let id = this.route.snapshot.params['id'];
    if (id !== "new") {
      this.tasksService.getOne(id).subscribe({
        next: (response: ITask) => {
          this.task = response;
          this.form.controls['id'].setValue(this.task.id);
          this.form.controls['title'].setValue(this.task.title);
          this.form.controls['completed'].setValue(this.task.completed);
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open(JSON.stringify(error), "OK", {
            duration: 3000
          });
        }
      })
    }
  }

  onSubmit() {
    if (this.task) {
      this.tasksService.put(this.form.getRawValue()).subscribe({
        next: (response: ITask) => {
          this.task = response;
          this.form.controls['title'].setValue(this.task.title);
          this.form.controls['completed'].setValue(this.task.completed);
          this.snackBar.open(`${response.title} editado con éxito`, "OK", {
            duration: 3000
          });
        }, error: (error) => {
          console.error(error);
          this.snackBar.open(JSON.stringify(error), "OK", {
            duration: 3000
          });
        }
      });
    } else {
      this.tasksService.post(this.form.getRawValue()).subscribe({
        next: (response: ITask) => {
          if (response) {
            this.task = response;
            this.snackBar.open(`${response.title} creado con éxito`, "OK", {
              duration: 3000
            });
            this.router.navigate([`/tasks/${response.id}`]);
          }
        }, error: (error) => {
          console.error(error);
          this.snackBar.open(JSON.stringify(error), "OK", {
            duration: 3000
          });
        }
      });
    }
  }

}
