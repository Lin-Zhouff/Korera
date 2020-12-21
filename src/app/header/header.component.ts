import {Component, OnDestroy, OnInit, AfterContentChecked} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterContentChecked {
  userIsAuthenticated = false;
  // @ts-ignore
  private authListenerSubs: Subscription;
  // @ts-ignore
  public Name : string = localStorage.getItem("userName");
  // @ts-ignore
  public Time : string = localStorage.getItem("CreateTime");

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngAfterContentChecked() {
  }

  onLogout(): void  {
    this.authService.logout();
  }

  ngOnDestroy(): void  {
    this.authListenerSubs.unsubscribe();
  }


}
