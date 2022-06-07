import { Component, OnInit, ViewChild } from '@angular/core';
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
export class UsersComponent implements OnInit {

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

  constructor(private usersService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(data => {
        // this.users = data;
      })
  }

  invalidName() {
    return this.createUserForm?.controls['name']?.invalid
      && this.createUserForm?.controls['name']?.touched;
  }

  invalidUsername() {
    return this.createUserForm?.controls['username']?.invalid
      && this.createUserForm?.controls['username']?.touched;
  }

  invalidEmail() {
    return this.createUserForm?.controls['email']?.invalid
      && this.createUserForm?.controls['email']?.touched;
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
        console.log(user);
        this.user.name = user.name;
        this.user.username = user.username;
        this.user.email = user.email;
        console.log(this.user);
        this.showDialog = true;
      })
    this.createUserForm.resetForm({
      name: '',
      username: '',
      email: ''
    });
  }

}
