import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})

/**
 * This component is for creating titles on every page
 */
export class PageTitleComponent implements OnInit {

  /**
   * title to be displayed as heading
   */
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
