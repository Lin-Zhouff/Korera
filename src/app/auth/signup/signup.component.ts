import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  // @ts-ignore
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm): void {
    if (form.invalid || form.value.passwordConfirm !== form.value.password) {
      console.log(form.value);
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.userName, form.value.password);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
