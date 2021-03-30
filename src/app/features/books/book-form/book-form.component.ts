import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BusService } from '../../../shared/bus/bus.service';
import { ActionForm, Libro } from '../../../shared/model';
import { CrudState } from '../../../shared/state/crud/model';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { BooksStoreService } from '../books-store.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() action: ActionForm = ActionForm.SAVE;

  actionForm = ActionForm;
  formBook: FormGroup;

  booksState$: Observable<CrudState<Libro>> = this.store.get$().pipe(
    tap((booksState) => {
      const book = booksState?.selectedElem;
      this.formBook.get('identificador').setValue(book?.id);
      this.formBook.get('titulo').setValue(book?.titulo);
      this.formBook.get('sinopsis').setValue(book?.sinopsis);
      return booksState;
    }));
  vm$ = combineLatest([this.booksState$]).pipe(
    map(([booksState]) => ({ booksState }))
  )

  constructor(
    public store: BooksStoreService,
    private cd: ChangeDetectorRef,
    private bus: BusService) {

  }

  ngOnInit() {
    const disable: boolean = this.action === ActionForm.DELETE;
    this.formBook = new FormGroup({
      identificador: new FormControl({ value: '', disabled: true }),
      titulo: new FormControl({ value: '', disabled: disable }, [Validators.required], [CustomValidators.titleTaken]),
      sinopsis: new FormControl({ value: '', disabled: disable }, [CustomValidators.startWithNumber])
    });
    this.formBook.get('titulo').statusChanges.subscribe(() => this.cd.markForCheck());
  }

  async save() {
    await this.store.addElem(this.getInfoForm());
    this.reset();
    this.bus.send('Book saved!');
  }

  async edit() {
    const libro: Libro = this.getInfoForm();
    await this.store.updateElem(libro);
    this.bus.send('Book edited!');
  }

  async delete() {
    await this.store.deleteElem(this.getInfoForm());
    this.reset();
    this.bus.send('Book deleted!');
  }

  reset() {
    this.action = ActionForm.SAVE;
    this.store.selectedElem({
      id: '',
      titulo: '',
      sinopsis: ''
    });
  }

  private getInfoForm(): Libro {
    return {
      id: this.formBook.get('identificador').value,
      titulo: this.formBook.get('titulo').value,
      sinopsis: this.formBook.get('sinopsis').value
    };
  }

}
