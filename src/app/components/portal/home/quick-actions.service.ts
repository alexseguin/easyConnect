import { Injectable } from '@angular/core';

export interface Action {
  link: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuickActionsService {

  actions: Action[] = [];
  
  constructor() { }

  add(action: Action) {
    this.actions.push(action);
  }
  remove(action: Action) {
    this.actions.splice(this.actions.findIndex(a => a.name === action.name));
  }
}
