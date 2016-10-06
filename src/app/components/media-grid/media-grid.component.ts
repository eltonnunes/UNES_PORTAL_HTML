import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mediaGrid',
  templateUrl: './media-grid.component.html',
  styleUrls: ['./media-grid.component.css']
})
export class MediaGridComponent implements OnInit {


  @Input() current: number = 1;
  @Input() totalRecords: number = 50;
  @Input() recordPerPage: number = 4;
  @Input() previous: boolean = false;
  @Input() next: boolean = false;
  @Input() pagination: boolean = true;
  @Input() totalRows : number = 50;
  @Input() protocol: string = 'http:';
  info: Boolean = false;

  @Output() currentUpdate = new EventEmitter();
  @Output() videoEditSelected = new EventEmitter();
  @Output() videoApagarSelected = new EventEmitter();

  @Input() rows : any = null;

  constructor() {
  }

  ngOnInit() {
  }

  onCurrentUpdate(event){
    this.currentUpdate.emit({current: event.current});
  }

  onVideoEditSelected(event){
    this.videoEditSelected.emit(event);
  }

  onVideoApagarSelected(event){
    this.videoApagarSelected.emit(event);
  }

  ngOnChanges(){
  }

}
