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
  displayedColumns: string[] = [];
  // @ts-ignore
  Datasorce : any;
  projectSelected = this.projects[0];

  constructor(public ProjectService: ProjectService, public FormulaService: FormulaService) {}
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.Datasorce = this.ProjectService.Datasource;
    if(this.FormulaService.showCode){
      this.displayedColumns =['resourceName','resourceCode'];
    }
    else {
      this.displayedColumns =['resourceName'];
    }
  }
  ngAfterViewInit(): void {
  }
  ngAfterViewChecked(){
    // console.log('changed');
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.value;
  }
  updateList(id: number, property: string, event: any) {
    console.log(id, property, event.target.value);
    this.editField = event.target.value;
    this.Datasorce[id][property] = this.editField;
    console.log(this.Datasorce);
  }
}
