import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusService } from './shared/bus/bus.service';
import { MessageState } from './shared/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  messageState$: Observable<MessageState> = this.busService.get$();

  vm$ = combineLatest([this.messageState$]).pipe(
    map(([messageState]) => ({ messageState }))
  )

  constructor(private busService: BusService) { }
}
