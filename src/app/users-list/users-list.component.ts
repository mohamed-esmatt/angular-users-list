import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, NgClass, FormsModule, HttpClientModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/users.json').subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }
  searchTerm = '';
  filteredUsers = this.users;
  searchUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.Email.toLocaleLowerCase().includes(
        this.searchTerm.toLocaleLowerCase()
      )
    );
  }
  resestSearch() {
    this.searchTerm = '';
    this.filteredUsers = this.users;
  }
}
