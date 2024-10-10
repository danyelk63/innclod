import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@coreComponents';
import { LoginService } from '@services';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'innclod';

  isLogged: boolean = false;

  constructor(private loginService: LoginService, private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.loginService.loginStatus$.subscribe(isLogged => {
      this.isLogged = isLogged;
      this.cdr.detectChanges();
    });
  }
}
