import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LoginModule],
  exports: [HomeComponent],
})
export class HomeModule {}
