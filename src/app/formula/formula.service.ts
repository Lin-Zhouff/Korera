import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/resources';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  private _showCode: boolean = true;
  // @ts-ignore
  private _fields:any[{name: string, type: string, formula: string}] = [];
  // @ts-ignore
  private _fieldstemp:any[{id:number, name: string, type: string, formula: string, vaild: boolean}] = [];
  public _Savevaild: boolean = false;
  _SavevaildChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this._SavevaildChange.subscribe((value) => {
      this._Savevaild = value;
    });
  }

  getfields(): any[] {
    return this._fields;
  }

  setfields(value: any[]) {
    this._fields = value;
  }
  getshowCode(): boolean {
    return this._showCode;
  }

  setshowCode(value: boolean) {
    this._showCode = value;
  }

  getSavevaild(): boolean {
    return this._Savevaild;
  }

  setSavevaild(value: boolean) {
    this._SavevaildChange.next(value);
  }

  getfieldstemp(): any[] {
    return this._fieldstemp;
  }

  setfieldstemp(value: any[]) {
    this._fieldstemp = value;
  }

  checkSavevaild(){
    // @ts-ignore
    var result = this._fieldstemp.reduce((sum, next) => sum || next.vaild, false);
    this.setSavevaild(result);
  }

  resetfields() {
    this._fields.length = 0;
    this._fieldstemp.length = 0;
  }

  Save(){
    // transform temp data to useable
    this._fields = this._fieldstemp.filter( (fields:{id:number, name: string, type: string, formula: string}) =>{
      return fields.name != ''}).map( (field:{id:number, name: string, type: string, formula: string}) => {
        return {
          name : field.name,
          type : field.type,
          formula: field.formula
        }
    });
  }

  SaveDataBase(data: any[]) {
    this.http.post(BACKEND_URL+'resources',data);
  }
}
