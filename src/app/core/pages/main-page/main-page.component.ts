import {Component} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})

export class MainPageComponent {

  isAuthorized: boolean = this.storageService.isAuthorized()
  display: boolean = false;

  constructor(private readonly storageService: TokenService,
              private readonly router: Router) {
  }

  onCreate() {
    if (this.isAuthorized) {
      this.router.navigateByUrl('tickets/create')
    } else {
      this.display = true;
    }
  }
}
