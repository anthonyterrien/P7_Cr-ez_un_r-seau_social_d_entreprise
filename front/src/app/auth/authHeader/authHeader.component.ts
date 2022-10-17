import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authHeader',
  templateUrl: './authHeader.component.html',
  styleUrls: ['./authHeader.component.scss']
})

export class AuthHeaderComponent implements OnInit {

  message: string | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (window.location.pathname === '/login' || window.location.pathname === '/auth/login') {
      this.message = 'Crée un profile';
    } else {
      this.message = 'Connexion';
    }
  }

  async button() {
    if (window.location.pathname === '/login' || window.location.pathname === '/auth/login') {
      this.message = 'Connexion';
      await this.navigate('signup')
    } else {
      this.message = 'Crée un profile';
      await this.navigate('login')
    }
  }
  async navigate(path: string) {
    await this.router.navigate([{outlets: {primary: path}}],
      {relativeTo: this.route});
  }
}
