import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LoginService, StorageService } from '@services';
import { AvatarModule } from 'ngx-avatars';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatMenuTrigger, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  initials: string = "";

  constructor(private router: Router, private loginService: LoginService, private storageService: StorageService) { }

  ngOnInit(): void {
    let user = this.storageService.get("user");
    if (user) {
      this.initials = (user.name[0] + user.lastName[0]).toUpperCase();
    }
    this.loginService.userData$.subscribe((user) => {
      if (user) {
        this.initials = (user.name[0] + user.lastName[0]).toUpperCase();
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
