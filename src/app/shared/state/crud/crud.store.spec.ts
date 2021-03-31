import { Observable, of } from 'rxjs';
import { CrudStore } from './crud.store';
import { Base, CrudRepository, CrudState } from './model';


describe('CRUD Store Test', () => {

    it('get all elems', async () => {

        const crudStore = new CrudStore<Example>(new FakeRepository(), 'EXAMPLE');
        await crudStore.getElems();

        const state: CrudState<Example> = crudStore.get();
        expect(state.elems.length).toBe(2);
        expect(state.selectedElem).toBe(state.elems[0]);

    })

    it('add elem', async () => {

        const crudStore = new CrudStore<Example>(new FakeRepository(), 'EXAMPLE');
        await crudStore.getElems();

        const addExample = { id: '3', name: 'example-3' };
        await crudStore.addElem(addExample);

        const state: CrudState<Example> = crudStore.get();
        expect(state.elems.length).toBe(3);
        expect(state.selectedElem).toBe(addExample);

    })

    it('update elem', async () => {

        const exampleName = 'example-test-1'

        const crudStore = new CrudStore<Example>(new FakeRepository(), 'EXAMPLE');
        await crudStore.getElems();

        const updateElem = { id: '1', name: exampleName };

        await crudStore.updateElem(updateElem);

        const state = crudStore.get();
        expect(state.elems[0].name).toEqual(exampleName);
        expect(state.selectedElem).toBe(updateElem);

    })

    it('delete elem', async () => {
        const exampleName = 'example-test-1'
        const crudStore = new CrudStore<Example>(new FakeRepository(), 'EXAMPLE');
        await crudStore.getElems();

        const deleteElem = { id: '1', name: exampleName }
        await crudStore.deleteElem(deleteElem);

        const state: CrudState<Example> = crudStore.get();
        expect(state.elems.length).toBe(1);
        expect(state.selectedElem).toBe(deleteElem);

    })

})

class FakeRepository implements CrudRepository<Example> {

    getAll(): Observable<Example[]> {

        const example1 = { id: '1', name: 'example-1' }
        const example2 = { id: '2', name: 'example-2' }
        const examples = [example1, example2];

        return of(examples);
    }

    add(elem: Example): Observable<Example> {
        return of(elem);
    }

    update(elem: Example): Observable<Example> {
        return of(elem);
    }

    delete(elem: Example): Observable<Example> {
        return of(elem);
    }


}

export interface Example extends Base {
    name: string;
}