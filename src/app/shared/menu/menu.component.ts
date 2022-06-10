import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items = [
    { title: 'Home', link: '/home' },
    { title: 'Users', link: '/users' },
    { title: 'Gallery', link: '/gallery' },
    { title: 'Posts', link: '/posts' }
  ]
  showMenuDisplay: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // evento para detectar click y cerrarlo el menu
  closeMenu = document.addEventListener("click", (event) => {
    if (document.body.clientWidth > 415) return
    if (!this.showMenuDisplay) return
    const menuIcon = this.getlement('.navbar__menuIcon');
    if (menuIcon?.contains(event.target as Node)) return
    const menu = this.getlement('.navbar__menu');
    this.toggleMenu(menu, 'none', false);
  });
  
  /* evento para detectar cambio del ancho de la pantalla
  y cerrar o abrir el menu segun el ancho */
  windowWidth = window.addEventListener('resize', () => {
    const menu = this.getlement('.navbar__menu');
    window.innerWidth > 415
      ? this.toggleMenu(menu, 'flex', true)
      : this.toggleMenu(menu, 'none', false)
  })
  
  showMenu() {
    const menu = this.getlement('.navbar__menu');
    if (!this.showMenuDisplay) {
      this.toggleMenu(menu, 'flex', true);
      return
    }
    this.toggleMenu(menu, 'none', false);
  }
  
  getlement(id: string) {
    return document.querySelector(id) as HTMLElement;
  }

  toggleMenu = (element: HTMLElement, display: string, boolean: boolean): void => {
    element.style.display = display;
    this.showMenuDisplay = boolean;
  }

}
