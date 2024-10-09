import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, SidebarComponent } from '@coreComponents';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'innclod';
}
