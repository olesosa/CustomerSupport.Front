import {Component} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAuthorized: boolean = this.tokenService.isAuthorized()
  display: boolean = false

  constructor(private readonly tokenService: TokenService,
              private readonly router: Router) {
  }

  onLogOut() {
    this.tokenService.removeToken()
    this.router.navigateByUrl('/').then(() => window.location.reload())
  }
}
