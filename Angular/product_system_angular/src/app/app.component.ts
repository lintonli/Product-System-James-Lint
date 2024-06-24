import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,CommonModule,FormsModule
    ,AddProductComponent,SignUpComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product_system_angular';


}
