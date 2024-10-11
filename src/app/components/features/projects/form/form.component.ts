import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '@httpServices';
import { IProject } from '@models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  form: FormGroup;

  project: IProject | null = null;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(null),
      name: this.formBuilder.control("", Validators.required),
      description: this.formBuilder.control(""),
    });
  }

  ngOnInit(): void {
    console.log("asdf")
    let id = this.route.snapshot.params['id'];
    if (id !== "new") {
      this.projectsService.getOne(id).subscribe({
        next: (response: IProject) => {
          this.project = response;
          this.form.controls['id'].setValue(this.project.id);
          this.form.controls['name'].setValue(this.project.name);
          this.form.controls['description'].setValue(this.project.description || this.project.email);
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
    if (this.project) {
      this.projectsService.put(this.form.getRawValue()).subscribe({
        next: (response: IProject) => {
          this.project = response;
          this.form.controls['name'].setValue(this.project.name);
          this.form.controls['description'].setValue(this.project.description || this.project.email);
          this.snackBar.open(`${response.name} editado con éxito`, "OK", {
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
      this.projectsService.post(this.form.getRawValue()).subscribe({
        next: (response: IProject) => {
          if (response) {
            this.project = response;
            this.snackBar.open(`${response.name} creado con éxito`, "OK", {
              duration: 3000
            });
            this.router.navigate([`/projects/${response.id}`]);
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
