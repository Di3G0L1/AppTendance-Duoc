import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserPage } from '../create-user/create-user.page';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  usuario: string = '';
  nuevaContrasena: string | null = null;
  confirmarContrasena: string = '';
  mensaje: string | null = null;

  constructor(private router: Router) { }

  generateNewPassword() {
    if (!this.usuario) {
      this.mensaje = 'Por favor, ingrese el nombre de usuario.';
      return;
    }

    // GENERAREMOS UNA CONTRASEÑA DE FORMA ALEATORIA
    this.nuevaContrasena = this.generateRandomPassword();

    const userList = CreateUserPage.getUserList();

    // LO SIGUIENTE ES PARA BUSCAR EL USUARIO DENTRO DE LA LISTA DE USUARIOS, SI EXISTE PASAMOS AL SIGUIENTE PASO
    const user = userList.find(user => user.user === this.usuario);

    if (user) {
      // ESTE IF ES PARA ACTUALIZAR LA CONTRASEÑA
      user.pass = this.nuevaContrasena;

      alert(`La nueva contraseña es: ${this.nuevaContrasena}`); //NOS PERMITE GENERAR UN MENSAJE DE ALERTA CON LA NUEVA CONTRASEÑA
      this.mensaje = 'Nueva contraseña generada y actualizada exitosamente. Puede copiarla y usarla para iniciar sesión.';
    } else {
      this.mensaje = 'Nombre de usuario no encontrado.';
    }
  } 

  generateRandomPassword(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 8; // LIMITAREMOS LA NUEVA CONTRASEÑA A 8 CARACTERES
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  copyToClipboard(text: string | null) {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Contraseña copiada al portapapeles.');
      }, (err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
