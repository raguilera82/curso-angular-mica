import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActionForm, Libro } from '../../../shared/model';
import { BooksProxyService } from '../books-proxy.service';
import { BooksProxyServiceFake } from '../books-proxy.service.fake';
import { BooksComponent } from './books.component';


describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksComponent],
      providers: [
        { provide: BooksProxyService, useClass: BooksProxyServiceFake }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books', waitForAsync(() => {
    component.vm$.subscribe(vm => {
      expect(vm.booksState.elems.length).toBe(2)
    })
  }))

  it('when click new should set default book', waitForAsync(() => {
    component.actionNew();
    component.vm$.subscribe(vm => {
      const selectedBook = vm.booksState.selectedElem;
      expect(selectedBook.id).toEqual('');
      expect(selectedBook.sinopsis).toEqual('');
      expect(selectedBook.titulo).toEqual('');
      expect(component.action).toEqual(ActionForm.SAVE);
    })
  }))

  it('when click edit selected book', waitForAsync(() => {
    component.actionEdit(BOOK_TEST);
    component.vm$.subscribe(vm => {
      expect(vm.booksState.selectedElem).toBe(BOOK_TEST);
    })
  }))

  it('when click delete selected book', waitForAsync(() => {
    component.actionDelete(BOOK_TEST);
    component.vm$.subscribe(vm => {
      expect(vm.booksState.selectedElem).toBe(BOOK_TEST);
    })
  }))

});

const BOOK_TEST: Libro = {
  id: '3',
  sinopsis: 'sinopsis1',
  titulo: 'titulo1'
}
