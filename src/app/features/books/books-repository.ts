import { Libro } from '../../shared/model';
import { CrudRepository } from '../../shared/state/crud/model';

export interface BooksRepository extends CrudRepository<Libro> { }