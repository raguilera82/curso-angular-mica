import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Libro } from '../../../shared/model';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  formBook: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.formBook = new FormGroup({
      identificador: new FormControl(''),
      titulo: new FormControl('', [Validators.required], [CustomValidators.titleTaken]),
      sinopsis: new FormControl('', [CustomValidators.startWithNumber])
    })
  }

  onSend() {
    const libro: Libro = {
      identificador: this.formBook.get('identificador')?.value,
      titulo: this.formBook.get('titulo')?.value,
      sinopsis: this.formBook.get('sinopsis')?.value
    }

    console.log('Libro', libro);
  }

}
