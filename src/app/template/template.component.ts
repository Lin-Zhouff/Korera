import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  projects= ['project1', 'project2','project3'];
  projectSelected = this.projects[0];
  // @ts-ignore
  @ViewChild('fieldsHeader', {read: ViewContainerRef}) Header: ViewContainerRef;
  // @ts-ignore
  private componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  addField(): void {
    //let childComponent = this.componentFactoryResolver.resolveComponentFactory(FieldFormComponent);
    //this.componentRef = this.Header.createComponent(childComponent);
  }

}
