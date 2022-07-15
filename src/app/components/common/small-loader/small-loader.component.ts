import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-loader',
  templateUrl: './small-loader.component.html',
  styleUrls: ['./small-loader.component.scss']
})
export class SmallLoaderComponent implements OnInit {
  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
