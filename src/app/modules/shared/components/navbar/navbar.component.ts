import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken'); 
  }

  public logout() {
    localStorage.removeItem('authToken'); 
    this.isLoggedIn = false; 
    this.router.navigate(['/login']); 
  }

  public navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }

  public navigateToProfile(): void {
    this.router.navigate(['/profile']); 
  }
}
