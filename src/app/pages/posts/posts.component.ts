import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] =[]

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.getPosts().subscribe(posts => {
      this.posts = posts
    })
  }

  deletePost(id: number) {
    this.usersService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }

}
