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
  searchTerm: string = '';
  selectedStatus: string = '';
  filteredUsers: User[] = [];
 
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
            this.filteredUsers = data; // ✅ necessary to populate table
          },
          error => {
            console.error('Failed to fetch users:', error);
          }
        );
      } else {
        console.error('Token is missing or invalid');
      }
    }
    

    filterUserss(): void {
      this.filteredUsers = this.users.filter(user => {
        const matchesName =
          user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());
    
        const matchesStatus =
          this.selectedStatus === '' ||
          String(user.approuve) === this.selectedStatus;
    
        return matchesName && matchesStatus;
      });
    }
    
    addUser(): void {
      // Show a modal or navigate to a form to add a new user
      alert('Add User clicked!');
    }
    
  
    deleteUser(id: number): void {
      this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
    }
    
    toggleApproval(id: number): void {
      this.userService.toggleApproval(id).subscribe((updatedUser: User) => {
        // Met à jour localement l'utilisateur dans la liste
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index].approuve = updatedUser.approuve;
        }
    
        // Met à jour aussi la liste filtrée si filtre actif
        const filteredIndex = this.filteredUsers.findIndex(u => u.id === id);
        if (filteredIndex !== -1) {
          this.filteredUsers[filteredIndex].approuve = updatedUser.approuve;
        }
      });
    }
    
    
    updateUser(user: User): void {
      const updatedUser = { ...user, firstName: 'Test modif' }; // ✅ modifiable plus tard avec un formulaire réel
      this.userService.updateUser(user.id, updatedUser).subscribe(() => this.fetchUsers());
    }
    
  }
  

