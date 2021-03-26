import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from './book-form/book-form.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';



@NgModule({
  declarations: [BooksComponent, BookFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
