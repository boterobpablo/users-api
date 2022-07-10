import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserSmall } from 'src/app/interfaces/user-small';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild('getUserForm') getUserForm!: NgForm;
  @ViewChild('createUserForm') createUserForm!: NgForm;

  user: UserSmall = {
    name: '',
    username: '',
    email: ''
  }

  users: User[] = [];
  valueRange: number = 5;
  showDialog: boolean = false;
  submits!: NodeListOf<Element>


  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data;
      })
  }

  ngAfterViewInit(): void {
    this.submits = document.querySelectorAll('input[type="submit"]');
  }



  // evento para detectar click fuera del dialog y cerrarlo
  // eventCloseDialog = document.addEventListener("click", (event) => {
  //   const dialog = document.querySelector('.dialog');
  //   if (dialog?.contains(event.target as Node)) return
  //   this.showDialog = false;
  //   this.enableInputs();
  // });

  invalidName() {
    return this.createUserForm?.controls['name']?.invalid
      && this.createUserForm?.controls['name']?.touched
  }

  invalidUsername() {
    return this.createUserForm?.controls['username']?.invalid
      && this.createUserForm?.controls['username']?.touched
  }

  invalidEmail() {
    return this.createUserForm?.controls['email']?.invalid
      && this.createUserForm?.controls['email']?.touched
  }

  getUser() {
    this.usersService.getUser(this.valueRange)
      .subscribe(user => {
        this.router.navigate(['/users', user.id]);
      })
  }

  postUser() {
    this.user.name = this.createUserForm?.controls['name']?.value;
    this.user.username = this.createUserForm?.controls['username']?.value;
    this.user.email = this.createUserForm?.controls['email']?.value;
    this.usersService.createUser(this.user)
      .subscribe(user => {
        this.showDialog = true;
        // deshabilitar inputs y submit mientras esta dialog abierto
        this.disableInputs()
        this.submits.forEach(submit => submit.toggleAttribute('disabled'))
      })
  }

  
  closeDialog() {
    this.showDialog = false;
    this.createUserForm.resetForm();
    this.enableInputs();
    this.submits[0].toggleAttribute('disabled')
  }

  
  disableInputs() {
    this.createUserForm?.controls['name']?.disable();
    this.createUserForm?.controls['username']?.disable();
    this.createUserForm?.controls['email']?.disable();
  }
  
  enableInputs() {
    this.createUserForm?.controls['name']?.enable();
    this.createUserForm?.controls['username']?.enable();
    this.createUserForm?.controls['email']?.enable();
  }
}
