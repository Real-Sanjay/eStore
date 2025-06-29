import { Injectable, Signal, signal } from '@angular/core';

export class StoreItem<T> {
  private readonly _state = signal(null as unknown as T);

  protected constructor(initalValue: T) {
    this._state.set(initalValue);
  }

  protected setItem(value: T) {
    this._state.set(value);
  }

  protected get Item() : T{
    return this._state();
  }

  protected get Item$() : Signal<T> {
    return this._state.asReadonly();
  }
}
