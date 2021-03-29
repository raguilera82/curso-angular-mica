import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionForm, Libro } from '../../../shared/model';
import { CrudState } from '../../../shared/state/crud/model';
import { BooksStoreService } from '../books-store.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  booksState$: Observable<CrudState<Libro>> = this.store.get$();
  vm$ = combineLatest([this.booksState$]).pipe(
    map(([booksState]) => ({ booksState }))
  )
  action: ActionForm;

  constructor(public store: BooksStoreService) { }

  ngOnInit() { }

  actionNew() {
    this.action = ActionForm.SAVE;
    this.store.selectedElem({
      id: '',
      titulo: '',
      sinopsis: ''
    });
  }

  actionEdit(book: Libro) {
    this.action = ActionForm.EDIT;
    this.store.selectedElem(book);
  }

  actionDelete(book: Libro) {
    this.action = ActionForm.DELETE;
    this.store.selectedElem(book);
  }


}
