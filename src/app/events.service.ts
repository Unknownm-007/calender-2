import { Injectable } from '@angular/core';
import Event from './event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events : Event[] = [];
  index = 0; 
  constructor() { }
}
