import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userName: string = 'User Name';
  @Output('selectAdmin') admin = new EventEmitter();
  @Output('selectSair') sair = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  open(adm){
    this.admin.emit({tab: adm});
  }

  eventSair(){
    this.sair.emit({sair: true});
  }

}
