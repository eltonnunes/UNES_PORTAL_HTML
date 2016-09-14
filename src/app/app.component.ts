import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';
  load : boolean = true;
  rows : any;
  cols : any;
  order: any = { col : 'id' , asc : false };
  pagination: any;

  constructor() {

    this.order = { col : 'id' , asc : false };
    this.cols = {
                  "id"          : "Id",
                  "first_name"  : "First Name",
                  "last_name"   : "Last Name",
                  "email"       : "E-mail",
                  "gender"      : "Gender",
                  "ip_address"  : "Ip Address"
                };

    this.pagination = {
                        current       : 4,
                        totalRecords  : 50,
                        recordPerPage : 4,
                        previous      : true,
                        next          : false,
                        pagination    : true
                      };

    this.rows =
    [{
        "id": 1,
        "first_name": "Judith",
        "last_name": "Burns",
        "email": "jburns0@wsj.com",
        "gender": "Female",
        "ip_address": "254.206.27.218"
      }, {
        "id": 2,
        "first_name": "Kenneth",
        "last_name": "Hawkins",
        "email": "khawkins1@artisteer.com",
        "gender": "Male",
        "ip_address": "189.55.25.49"
      }, {
        "id": 3,
        "first_name": "Walter",
        "last_name": "Jackson",
        "email": "wjackson2@istockphoto.com",
        "gender": "Male",
        "ip_address": "81.0.131.21"
      }, {
        "id": 4,
        "first_name": "Pamela",
        "last_name": "Watson",
        "email": "pwatson3@flavors.me",
        "gender": "Female",
        "ip_address": "147.175.6.242"
      }, {
        "id": 5,
        "first_name": "Andrea",
        "last_name": "Arnold",
        "email": "aarnold4@exblog.jp",
        "gender": "Female",
        "ip_address": "92.145.207.1"
      }, {
        "id": 6,
        "first_name": "Gregory",
        "last_name": "Mendoza",
        "email": "gmendoza5@noaa.gov",
        "gender": "Male",
        "ip_address": "70.242.101.119"
      }, {
        "id": 7,
        "first_name": "Kathy",
        "last_name": "Fuller",
        "email": "kfuller6@exblog.jp",
        "gender": "Female",
        "ip_address": "49.22.90.202"
      }, {
        "id": 8,
        "first_name": "Betty",
        "last_name": "Knight",
        "email": "bknight7@1und1.de",
        "gender": "Female",
        "ip_address": "70.44.193.177"
      }, {
        "id": 9,
        "first_name": "Kathleen",
        "last_name": "Lee",
        "email": "klee8@ihg.com",
        "gender": "Female",
        "ip_address": "97.237.182.70"
      }, {
        "id": 10,
        "first_name": "Annie",
        "last_name": "Burns",
        "email": "aburns9@ebay.co.uk",
        "gender": "Female",
        "ip_address": "143.31.4.52"
      }];

  }

  ngOnInit(){
    //setTimeout(() => {
      this.load = false;
    //}, 10000);

  }
}
