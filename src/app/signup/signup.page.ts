import { Component, OnInit } from '@angular/core';
import { RandomUserService } from '../services/random-user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {
  userData: any = {
    Nombre: '',
    Apellidos: '',
    Email: '',
    Password: ''
  }
  passwordFieldType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(
    private randomUserService: RandomUserService
  ) { }

  ngOnInit() {
    this.randomUserService.getRandomUser().subscribe({
      next: (res: any) => {
        const { results } = res
        if (results.length > 0) {
          console.log(results[0])
          this.userData.Nombre = results[0]?.name?.first
          this.userData.Apellidos = results[0]?.name?.last
          this.userData.Email = results[0]?.email
          this.userData.Password = results[0]?.login.password
        }
      },
      error: (error: any) => {
        console.log(error)
      }
    })
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permiso de notificación concedido.');
        }
      })
    }
  }


  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  crearUsuario() {
    this.randomUserService.createUser(this.userData).subscribe({
      next:(res: any) => {
        console.log(res)
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.mostrarNotificacion('Registro exitoso', 'El usuario ha sido registrado exitosamente.');
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  mostrarNotificacion(titulo: string, cuerpo: string) {
    if ('Notification' in window) {
      new Notification(titulo, {
        body: cuerpo
      });
    } else {
      console.log('Las notificaciones no son soportadas en este navegador.');
    }
  }


}
