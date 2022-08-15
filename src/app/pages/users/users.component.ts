import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserSmall } from 'src/app/interfaces/user-small';
import { UsersService } from 'src/app/services/users.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

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

  
  constructor(
    private usersService: UsersService,
    private router: Router,
    public dialog: Dialog
  ) { }


  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data;
      })
  }


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
        this.openDialog();
      })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open<string>(DialogComponent, {
      data: {
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
      }
    });

    dialogRef.closed.subscribe(result => {
      console.log(`The dialog was closed by ${result}`);
      this.createUserForm.resetForm();
    });
  }
}
