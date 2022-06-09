import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { UserSmall } from '../interfaces/user-small';
import { UserImage } from '../interfaces/user-image';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`)
  }

  createUser(user: UserSmall): Observable<UserSmall> {
    return this.http.post<UserSmall>(`${this.baseUrl}users`, user);
  }

  getUserImage(): Observable<UserImage> {
    return this.http.get<UserImage>('https://randomuser.me/api/?results=30')
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}posts?userId=1`);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}posts/${id}`)
  }
}
