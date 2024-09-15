import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage {

  reg_user: string = '';
  reg_pass: string = '';
  reg_name: string = '';

  isAlertOpen = false;

  // DEBEMOS CREAR UNA LISTA PARA GUARDAR LOS USUARIOS CREADOS
  private static userList: { user: string; pass: string; name: string }[] = [];

  constructor(private router: Router) { }

  register() {
    if (this.reg_user && this.reg_pass && this.reg_name) {
      // ALMACENAMOS LOS USUARIOS EN LA LISTA
      CreateUserPage.userList.push({
        user: this.reg_user,
        pass: this.reg_pass,
        name: this.reg_name
      });

      // ESTO NOS SIRVE PARA ENVIAR LOS DATOS DEL USER CREADO AL LOGIN
      let datos: NavigationExtras = {
        state: {
          user: this.reg_user,
          pass: this.reg_pass,
          name: this.reg_name
        }
      };

      this.router.navigate(['login'], datos);
    } else {
      this.isAlertOpen = true;
      console.log('Por favor, completa todos los campos.');
    }
  }

  // ESTE METODO NOS PERMITE AGREGAR LOS USUARIOS CREADOS A LA LISTA
  static getUserList() {
    return CreateUserPage.userList;
  }
}
