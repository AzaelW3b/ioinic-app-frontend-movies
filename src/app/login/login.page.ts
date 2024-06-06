import { Component, OnInit } from '@angular/core';
import { RandomUserService } from '../services/random-user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  auth: any = {
    Email: '',
    Password: ''
  }
  constructor(
    private randomUserService: RandomUserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  iniciarSesion() {
    this.randomUserService.iniciarSesion(this.auth).subscribe({
      next:(res: any) => {
        if(res.token) {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        }
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

}
