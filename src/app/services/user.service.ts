import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(userID: number): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:5000/users")
      .pipe(map(users => users.filter(user => user.id !== userID)))
  }

  getUser(user: User): Observable<User | null> {
    return this.http
      .get<User[]>(`http://localhost:5000/users?username=${user.username}&password=${user.password}`)
      .pipe(map(users => {
        if (users.length === 0) {
          return null
        } else {
          return users[0]
        }
      }))
  }

  createUser(user: User): Observable<undefined> {
    return this.http.post<undefined>('http://localhost:5000/users', user)
  }
}
