import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {


  private _showCode: boolean = true;
  private _fields:any[] = [];
  constructor() { }

  get fields(): any[] {
    return this._fields;
  }

  set fields(value: any[]) {
    this._fields = value;
  }
  get showCode(): boolean {
    return this._showCode;
  }

  set showCode(value: boolean) {
    this._showCode = value;
  }
}
