import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CreateUserPage } from '../create-user/create-user.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_user: string = '';
  mdl_pass: string = '';
  mdl_name: string = '';

  warningVisible: boolean = false;
  loadingVisible: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.mdl_user = navigation.extras.state['user'] || '';
      this.mdl_pass = navigation.extras.state['pass'] || '';
      this.mdl_name = navigation.extras.state['name'] || '';
      console.log("Nombre completo antes de enviar a principal:", this.mdl_name);
    }
  }

  login() {
    this.warningVisible = false;
    this.loadingVisible = true;

    setTimeout(() => {
      // EN ESTA LINEA OBTENEMOS UNA LISTA CON LOS USUARIOS REGISTRADOS EN EL FORMULARIO DE CREACIÓN DE USERS
      const userList = CreateUserPage.getUserList();

      // EN ESTA LINEA VALIDAREMOS LAS CREDENCIALES
      const validUser = userList.find(
        cred => cred.user === this.mdl_user && cred.pass === this.mdl_pass
      );

      if (!validUser) {
        this.warningVisible = true;
        this.loadingVisible = false;
        console.log("Credenciales inválidas");
      } else {
        let datos: NavigationExtras = {
          state: {
            usuario: validUser.user,
            contrasena: validUser.pass,
            nombreCompleto: validUser.name,
            mensaje: "Login exitoso"
          }
        };
        console.log('Nombre completo del login:', validUser.name); // ESTA LINEA ES PARA MOSTRAR EN PANTALLA EL NOMBRE COMPLETO
        this.router.navigate(['principal'], datos);
      }

      this.loadingVisible = false;
    }, 2000);
  }

  goToCreateUser() {
    this.router.navigate(['create-user']);
  }

  goToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
}
