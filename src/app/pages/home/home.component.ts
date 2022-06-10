import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user!: User;
  image: string = ''

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.getUserImage().subscribe( data => {
      this.image = data.results[0].picture.large;
    })

    this.usersService.getUser(1).subscribe( user => {
      this.user = user;
    })

  }

}
