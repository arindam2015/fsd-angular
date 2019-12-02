import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username  = new FormControl('', Validators.required);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    submitMessage= '';

    constructor (private authService: AuthenticationService, private routeService: RouterService) {}

    loginSubmit() {

      const user = {
        username: this.username.value,
        password: this.password.value,
      };
     
      this.authService.authenticateUser(user).subscribe(
        data => {
          
          this.authService.setBearerToken(data['token']);
          this.routeService.routeToDashboard();
      },
      errorMessage => {
        if (errorMessage.status == '403') {
          this.submitMessage = errorMessage.error.message;
        } else if (errorMessage.status == '404') {
          this.submitMessage = errorMessage.message;
        }
      }
    );

    }
}
