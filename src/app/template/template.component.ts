import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, DoCheck,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FieldFormComponent} from '../field-form/field-form.component';
import {FormulaService} from '../formula/formula.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, AfterViewChecked{

  projects= ['project1', 'project2','project3'];
  projectSelected = this.projects[0];
  code = true;
  // @ts-ignore
  saveVaild;
  // @ts-ignore
  @ViewChild('fieldsHeader', {read: ViewContainerRef}) Header: ViewContainerRef;
  // @ts-ignore
  private componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              public formulaService: FormulaService) {
  }

  ngOnInit(): void {
    this.formulaService.resetfields();
    this.code = this.formulaService.getshowCode();
    this.formulaService._SavevaildChange.asObservable()
      .subscribe(value => {
        this.saveVaild = value;
        // console.log('changes '+ this.saveVaild)
      });
  }

  ngAfterViewChecked() {
  }

  addField(): void {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(FieldFormComponent);
    this.componentRef = this.Header.createComponent(childComponent);
  }

  save(){
    this.formulaService.setshowCode(this.code);
    this.formulaService.Save();
  }

}

export interface field {
  name: string;
  type: string;
  fomula :string;
}
