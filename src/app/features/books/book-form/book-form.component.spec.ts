import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BusService } from '../../../shared/bus/bus.service';
import { Libro } from '../../../shared/model';
import { BooksProxyService } from '../books-proxy.service';
import { BooksProxyServiceFake } from '../books-proxy.service.fake';
import { BooksStoreService } from '../books-store.service';
import { BookFormComponent } from './book-form.component';


describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BooksProxyService, useClass: BooksProxyServiceFake }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when user select a book should set values on form', waitForAsync(() => {
    component.store.getElems();
    const store: BooksStoreService = TestBed.inject(BooksStoreService);
    store.selectedElem(BOOK_TEST);
    expect(component.formBook.get('identificador').value).toEqual(BOOK_TEST.id);
    expect(component.formBook.get('titulo').value).toEqual(BOOK_TEST.titulo);
    expect(component.formBook.get('sinopsis').value).toEqual(BOOK_TEST.sinopsis);
  }))

  it('when user click save', waitForAsync(async () => {
    component.store.getElems();
    const spyBus = spyOn(TestBed.inject(BusService), 'send');
    const store: BooksStoreService = TestBed.inject(BooksStoreService);
    store.selectedElem(BOOK_TEST);
    await component.save();
    component.vm$.subscribe(vm => {
      expect(vm.booksState.elems.length).toBe(3);
      expect(vm.booksState.elems.some(book => book.titulo === BOOK_TEST.titulo)).toBeTruthy();
    })
    expect(spyBus).toHaveBeenCalled();

  }))

  it('when user click update', waitForAsync(async () => {
    component.store.getElems();
    const spyBus = spyOn(TestBed.inject(BusService), 'send');
    const libroEdited = { ...BOOK_TEST, id: '1', sinopsis: 'cambio1' };
    const store: BooksStoreService = TestBed.inject(BooksStoreService);
    store.selectedElem(libroEdited);
    await component.edit();
    component.vm$.subscribe(vm => {
      expect(vm.booksState.elems.length).toBe(2);
      expect(vm.booksState.elems.some(book => book.id === libroEdited.id)).toBeTruthy();
    })
    expect(spyBus).toHaveBeenCalled();
  }))

  it('when user click delete', waitForAsync(async () => {
    component.store.getElems();
    const spyBus = spyOn(TestBed.inject(BusService), 'send');
    const store: BooksStoreService = TestBed.inject(BooksStoreService);
    const libroDeleted = { ...BOOK_TEST, id: '1' };
    store.selectedElem(libroDeleted);
    await component.delete();
    component.vm$.subscribe(vm => {
      expect(vm.booksState.elems.length).toBe(1);
      expect(vm.booksState.elems.some(book => book.id !== libroDeleted.id)).toBeTruthy();
    })
    expect(spyBus).toHaveBeenCalled();
  }))

});

const BOOK_TEST: Libro = {
  id: '3',
  titulo: 'titulo3',
  sinopsis: 'sinopsis3'
}
