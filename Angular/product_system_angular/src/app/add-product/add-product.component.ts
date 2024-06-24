import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 
  categories = ['Electronics', "Clothing", "Shoes", "Accessories"]
 
  products: any[] = []
 
  form!: FormGroup
 
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      category: new FormControl(null, Validators.required)
    });
  }
 
  onSubmit() {
    if (this.form.valid) {
      console.log("Form Submitted");
      console.log(this.form.value);
      this.products.push(this.form.value);
      console.log("The whole array", this.products);
      this.form.reset(); // Reset the form after submission
    }
  }
}