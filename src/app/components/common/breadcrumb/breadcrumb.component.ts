import {Component, Input, OnInit} from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  faHome = faHome;
  @Input() base!: string;
  @Input() basePath!: string;
  @Input() child!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
