import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StudentHeaderComponent } from './components/student-header/student-header.component';
import { TeacherHeaderComponent } from './components/teacher-header/teacher-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent, MatIconModule, MatButtonModule, StudentHeaderComponent, TeacherHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AI.Exam.UI';
role: string = '';
  showHeader = true;

  constructor(private router: Router, private authService: AuthService) {
    // this.router.events
    //   .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     const noHeaderRoutes = ['/login', '/register'];
    //     this.showHeader = !noHeaderRoutes.includes(event.urlAfterRedirects);
    //   });
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decoded = this.authService.decodeToken(token);
      this.role = decoded?.Role;
    }
  }
  
}
