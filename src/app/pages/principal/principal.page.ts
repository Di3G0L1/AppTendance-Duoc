import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  nombreCompleto: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // ESTO NOS PERMITIRÁ RECUPERAR LOS DATOS DESDE LA PANTALLA ANTERIOR
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['usuario'] || '';
      this.contrasena = navigation.extras.state['contrasena'] || '';
      this.nombreCompleto = navigation.extras.state['nombreCompleto'] || '';

      console.log("Nombre completo:", this.nombreCompleto);
    } else {
      console.log("No se recibieron datos en principal.");
    }
  }

  logout() {
    this.router.navigate(['login']);
  }

  info() {
    this.router.navigate(['user-info'], {
      state: {
        usuario: this.usuario,
        nombreCompleto: this.nombreCompleto,
        contrasena: this.contrasena
      }
    });
    console.log('Nombre completo enviado a user-info:', this.nombreCompleto);
  }
  
}
