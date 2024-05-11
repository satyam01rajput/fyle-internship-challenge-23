import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { GitHubUser } from 'src/model/GitHubUser';
import { Repo } from 'src/model/Repo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  username:string="";
  user:GitHubUser | undefined;
  repos: Repo[]
  res:undefined | "User Not Found!";
  perPage = 6
  currentPage = 1

  isLoading$: Observable<boolean>;

  constructor(
    private apiService: ApiService
  ) {
    this.repos = [];
    this.isLoading$ = this.apiService.loading$;
  }
  ngOnInit() {
  }
  onSearch(){
    this.currentPage=1
  
    this.apiService.getUser(this.username).subscribe((user:any)=>{
      
      this.user = user;
      console.log(this.user)
      this.apiService.getRepos(this.username).subscribe((repos) => {
        console.log(repos);
        this.repos = repos;
      })
    },
    error => {
      this.res = error.error.message;
      console.error('Error fetching user data:', error);
      this.user = undefined;
      this.repos = []
    }); 
  }
}
