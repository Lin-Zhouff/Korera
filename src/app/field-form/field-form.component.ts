import {Component, OnInit, AfterContentChecked, DoCheck} from '@angular/core';
import {FormulaService} from '../formula/formula.service';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit,AfterContentChecked {

  Deleted = true;
  FormulaDisplay = false;
  // @ts-ignore
  id : number;
  // @ts-ignore
  Type : string = '';
  // @ts-ignore
  Name : string = '';
  // @ts-ignore
  Formula: string = '';
  // @ts-ignore
  constructor(public formulaService:FormulaService) {
    formulaService.setSavevaild(true);
  }

  ngOnInit(): void {
    this.id = this.formulaService.getfieldstemp().length;
    this.formulaService.getfieldstemp()
      .push({id:this.id,name:this.Name,type:this.Type,formula:this.Formula});
  }


  ngAfterContentChecked(): void {
    const field = this.formulaService.getfieldstemp()[this.id]
    field['name'] = this.Name;
    field['type'] = this.Type;
    field['formula'] = this.Formula;
    field['vaild'] = !this.CheckInputVaild();
    this.formulaService.getfieldstemp()[this.id] = field;
    this.formulaService.checkSavevaild();
  }
  selectOption() {
    this.FormulaDisplay = this.Type == 'Formula';
  }

  ValidFormula(): boolean{
    var nameList = this.formulaService.getfieldstemp().map( data => data['name'])
    nameList.splice(nameList.indexOf(this.Name),1);
    var sign = ['+', '-', '*', '/'];
    // var separators = [' ', '\\\+', '-', '\\*', '/'];
    var tokens = this.Formula.split(' ').filter( value => value);
    for (let token of tokens){
      if (!nameList.includes(token) && !sign.includes(token) && isNaN(Number(token))){
        return false;
      }
    }
    return true;
  }

  delete(){
    this.Formula = '';
    this.Name = '';
    this.Type = '';
    this.Deleted =false;
  }

  CheckInputVaild(): boolean{
    if(this.Type !== '' && this.Name !== '' && this.Type !== 'Formula'){
      console.log('or here')
      return true;
    }
    else if(this.Type !== '' && this.Name !== ''&& this.Formula !== '' && this.ValidFormula()){
      console.log('here')
      return true;
    }
    return false;
  }
}
