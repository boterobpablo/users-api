import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  items = [
    { title: 'Home', link: '/' },
    { title: 'Users', link: '/users' },
    { title: 'Gallery', link: '/gallery' },
    { title: 'Posts', link: '/posts' }
  ]
  showMenuDisplay: boolean = false


  /* hacer referencia a un elemento del HTML y usarlo como una 
  propiedad, toma el elemento con referencia local */
  @ViewChild('toggle_button') toggleButton!: ElementRef
  @ViewChild('navbar__menu') navbarMenu!: ElementRef


  constructor() { }

  ngOnInit(): void { }


  /* se inicializan las constantes para las referencias que se tomaron 
  y se inicializan aqui porque este metodo se ejecuta despues de que
  la vista se ha cargado */
  ngAfterViewInit() {
    const toggleButtonElem = this.toggleButton.nativeElement
    const navbarElem = this.navbarMenu.nativeElement

    const toggleMenu = toggleButtonElem.addEventListener('click', () => {
        navbarElem.classList.toggle('active')
      })
    toggleMenu

    // evento para detectar click y cerrar el menu
    const closeMenu = document.addEventListener("click", (event) => {
      if (toggleButtonElem.contains(event.target as Node)) return
      if (navbarElem.classList.contains('active')) navbarElem.classList.toggle('active')
    });
    closeMenu
  }

}
