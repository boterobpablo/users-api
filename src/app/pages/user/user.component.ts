import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  user!: User;
  image: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.usersService.getUser(id) )
      )
      .subscribe( user => this.user = user );

    this.usersService.getUserImage().subscribe( data => {
      this.image = data.results[0].picture.large;
    })
  }
}
