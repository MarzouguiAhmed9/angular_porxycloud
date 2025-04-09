import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User, UserService } from 'src/app/serviceUser/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-listusers',
    imports: [RouterModule, SharedModule],
    standalone: true, 
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.scss'
})

export class ListusersComponent implements OnInit {

 
    users: User[] = [];
  
    constructor(private userService: UserService) {}
  
    ngOnInit(): void {
      this.fetchUsers();
    }
    fetchUsers(): void {
      const token = localStorage.getItem('authToken');
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.userService.getAllUsers(headers).subscribe(
          data => {
            this.users = data;
          },
          error => {
            console.error('Failed to fetch users:', error);
          }
        );
      } else {
        console.error('Token is missing or invalid');
      }
    }
    
  
    deleteUser(id: number): void {
      this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
    }
  
    toggleApproval(id: number): void {
      this.userService.toggleApproval(id).subscribe(() => this.fetchUsers());
    }
  
    updateUser(user: User): void {
      // ici tu peux afficher une modale pour l'update (on peut la faire ensemble)
      const updatedUser = { ...user, firstname: 'Test modif' }; // exemple
      this.userService.updateUser(user.id, updatedUser).subscribe(() => this.fetchUsers());
    }
  }
  

