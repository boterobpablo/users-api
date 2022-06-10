import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-photos',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photos: string[] = []

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.getUserImage().subscribe((data) => {
        const users = data.results;
        for (const user of users) {
          const photo = user.picture.large
          this.photos.push(photo);
        }
      })
  }
}
