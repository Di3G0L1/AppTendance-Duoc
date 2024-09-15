import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserPage } from '../create-user/create-user.page';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  nombreCompleto: string = '';
  usuario: string = '';
  contrasenaActual: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  antiguaContrasena: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    // LO SIGUIENTE ES PARA OBTENER LOS DATOS DE USUARIO HEREDADOS DE LAS PANTALLAS ANTERIORES
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['usuario'] || '';
      this.nombreCompleto = navigation.extras.state['nombreCompleto'] || '';
      this.antiguaContrasena = navigation.extras.state['contrasena'] || '';
      console.log("Nombre completo en user-info:", this.nombreCompleto);
    } else {
      console.log("No se recibieron datos en user-info.");
    }
  }

  saveChanges() {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      alert('Las contraseñas nuevas no coinciden.');
      return;
    }

    if (this.contrasenaActual === this.antiguaContrasena) {
      // LO SIGUIENTE ES PARA ACTUALIZAR LA CONTRASEÑA Y QUE SE GUARDE EN EL SISTEMA
      const userList = CreateUserPage.getUserList();
      const userIndex = userList.findIndex(user => user.user === this.usuario);
      if (userIndex !== -1) {
        userList[userIndex].pass = this.nuevaContrasena;
        alert('Cambios guardados exitosamente.');
      } else {
        alert('Usuario no encontrado.');
      }
      this.router.navigate(['principal'], {
        state: {
          usuario: this.usuario,
          contrasena: this.nuevaContrasena,
          nombreCompleto: this.nombreCompleto
        }
      });
    } else {
      alert('La contraseña actual es incorrecta.');
    }
  }

  back() {
    this.router.navigate(['principal']);
  }
}
