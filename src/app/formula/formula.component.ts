import {Component, OnInit, AfterViewChecked, ViewChild, AfterViewInit} from '@angular/core';
import {ProjectService} from '../project/project.service';
import {Subscription} from 'rxjs';
import {ResourcesModel} from '../resources/resources.model';
import {FormulaService} from './formula.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit,AfterViewInit,AfterViewChecked {
  // @ts-ignore
  editField : string;
  projects= ['project1', 'project2','project3'];
  // @ts-ignore
  FormulaList : string[];
  displayedColumns: string[] = [];
  // @ts-ignore
  Datasorce = new MatTableDataSource<ResourcesModel>();
  projectSelected = this.projects[0];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public ProjectService: ProjectService, public FormulaService: FormulaService) {
    this.FormulaList = [];
  }

  ngOnInit(): void {
    if (!this.ProjectService.Datasource){
      this.Datasorce.data = [{'resource name': '', 'resource code' :''}];
    }else {
      this.Datasorce.data = this.ProjectService.Datasource;
    }
    if(this.FormulaService.getshowCode()){
      this.displayedColumns =['resource name','resource code'];
    }
    else {
      this.displayedColumns =['resource name'];
    }

    var nameList = this.FormulaService.getfields().map( data => data['name'])
    this.displayedColumns = this.displayedColumns.concat(nameList);
    // @ts-ignore
    this.Datasorce.data.map( onedata => {
      for (let name of nameList){
        // @ts-ignore
        onedata[name] = '';
      }
      return onedata;
    })
    this.FormulaService.getfields().map( data =>{
      if (data['type'] === 'Formula'){
        // @ts-ignore
        this.FormulaList.push({name: data['name'], Formula: data['formula']})
      }
    })

  }
  ngAfterViewInit(): void {
    this.Datasorce.paginator = this.paginator;
  }
  ngAfterViewChecked(){
    // console.log('changed');
  }
  changeValue(id: number, property: string, event: any) {
    // @ts-ignore
    var nameList = this.FormulaList.map( data => data['name'])
    if(!nameList.includes(property)){
      this.editField = event.target.value;
    }
  }
  updateList(id: number, property: string, event: any) {
    // @ts-ignore
    var nameList = this.FormulaList.map( data => data['name'])
    if(nameList.includes(property)){
      // @ts-ignore
      this.Datasorce.data[id][property] = this.Calculator(id, property);
      event.target.value = this.Calculator(id, property);
      // @ts-ignore
    }else{
      this.editField = event.target.value;
      // @ts-ignore
      this.Datasorce.data[id][property] = this.editField;
      console.log('lazy lazy boy')
    }

  }

  // @ts-ignore
  Calculator(id :number,property: string): string{
    const formula = this.FormulaList.filter( data => {
      // @ts-ignore
      return property === data['name'];})[0]['Formula'];
    var stack: number[] = [];
    var result = 0;
    var currentNumber = 0;
    var operation = '+';
    // @ts-ignore
    var tokens = formula.split(' ').filter( value => value);
    for (let index in tokens){
      if (!isNaN(Number(tokens[index]))){
        currentNumber = Number(tokens[index]);
      }else if(this.displayedColumns.includes(tokens[index])){
        // @ts-ignore
        currentNumber = Number(this.Datasorce.data[id][tokens[index]]);

      }
      if((!this.displayedColumns.includes(tokens[index]) && isNaN(Number(tokens[index]))) || Number(index) == tokens.length-1 ){
        // @ts-ignore
        if(operation === '-'){
          stack.push(-currentNumber);
        }else if(operation === '+'){
          stack.push(currentNumber);
        }else if(operation === '*'){
          stack.push(<number> stack.pop() * currentNumber);
        }else if(operation === '/'){
          stack.push(<number> stack.pop() / currentNumber);
        }
        currentNumber = 0;
        operation = tokens[index];
      }
    }
    result += currentNumber;
    while (stack.length !== 0){
      // @ts-ignore
      result += stack.pop();
    }
    return String(result);
  }

  SaveDataBase(){
    this.FormulaService.SaveDataBase(this.Datasorce.data);
  }
}
