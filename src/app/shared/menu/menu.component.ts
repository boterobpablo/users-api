import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items = [
    {title: 'Home', link: '/home'},
    {title: 'Users', link: '/users'},
    {title: 'Gallery', link: '/gallery'},
    {title: 'Posts', link: '/posts'}
  ]
  

  constructor() { }

  ngOnInit(): void {
  }

}
