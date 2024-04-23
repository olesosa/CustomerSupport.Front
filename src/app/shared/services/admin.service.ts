import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AdminCreate} from "../interfaces/admin-create";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly apiUrl = environment.apiIdentityAddress + '/Admins'

  constructor(private readonly http: HttpClient) {
  }

  public create(admin: AdminCreate):Observable<User>{

    return this.http.post<User>(this.apiUrl, admin)
  }

  public remove(adminId: string){

    return this.http.delete(this.apiUrl + `/${adminId}`)
  }
}
