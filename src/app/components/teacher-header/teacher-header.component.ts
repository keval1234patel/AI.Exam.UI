import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './teacher-header.component.html',
  styleUrl: './teacher-header.component.css'
})
export class TeacherHeaderComponent implements OnInit {
  isLoggedIn = false;
  userInitials = 'U';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userInitials = this.authService.getUser()?.EmailId?.charAt(0).toUpperCase() || 'U';
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
