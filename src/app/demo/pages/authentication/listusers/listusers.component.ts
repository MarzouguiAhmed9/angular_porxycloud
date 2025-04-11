import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { User, UserService } from 'src/app/serviceUser/user.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Role } from 'src/app/serviceUser/role/Role';

@Component({
  selector: 'app-listusers',
  imports: [RouterModule, SharedModule, FormsModule],
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss'],
  standalone: true,
})
export class ListusersComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = '';
  filteredUsers: User[] = [];
  users: User[] = [];
  availableRoles: Role[] = [];

  editingUser: User | null = null;
  newUser: User = this.initNewUser();
  isModalOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.loadRoles();
  }

  initNewUser(): User {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      birthday: '',
      address: '',
      phone: '',
      email: '',
      approuve: false,
      enabled: true,
      username: '',
      password: '',
      role: { id: 2, name: 'ROLE_CLIENT', authority: 'ROLE_CLIENT' },
    };
  }

  loadRoles() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const decodedToken = this.userService.decodeToken(token);
      const userId = decodedToken?.id; // Vous devez extraire l'ID de l'utilisateur du token
  
      if (userId) {
        this.userService.getRoles(userId).subscribe(
          (roles: Role[]) => {
            this.availableRoles = roles;
            if (!this.newUser.role) {
              this.newUser.role = { id: 2, name: 'ROLE_CLIENT', authority: 'ROLE_CLIENT' }; // Default role
            }
          },
          (error) => console.error('Error loading roles:', error)
        );
      } else {
        console.error('ID utilisateur manquant');
      }
    } else {
      console.error('Token is missing or invalid');
    }
  }
  

  fetchUsers(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.userService.getAllUsers(headers).subscribe(
        (data) => {
          this.users = data;
          this.filteredUsers = data;
        },
        (error) => console.error('Failed to fetch users:', error)
      );
    } else {
      console.error('Token is missing or invalid');
    }
  }

  filterUserss(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesName =
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.selectedStatus === '' || String(user.approuve) === this.selectedStatus;

      return matchesName && matchesStatus;
    });
  }

  addUser(): void {
    this.newUser = this.initNewUser();
    this.isModalOpen = true;
  }

  saveUser(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      if (this.editingUser) {
        this.userService.updateUser(this.editingUser.id, this.editingUser, headers).subscribe(
          () => {
            this.fetchUsers();
            this.closeModal();
          },
          (error) => console.error('Error updating user:', error)
        );
      } else {
        const newUserData: User = {
          id: 0, // Add the id here
          firstName: this.newUser.firstName,
          lastName: this.newUser.lastName,
          birthday: this.newUser.birthday,
          address: this.newUser.address,
          phone: this.newUser.phone,
          email: this.newUser.email,
          approuve: this.newUser.approuve,
          enabled: this.newUser.enabled,
          username: this.newUser.username,
          password: this.newUser.password,
          role: { id: this.newUser.role.id, name: this.newUser.role.name, authority: this.newUser.role.authority }, // Fix role structure
        };

        this.userService.addUser(newUserData, headers).subscribe(
          () => {
            this.fetchUsers();
            this.closeModal();
          },
          (error) => console.error('Error adding user:', error)
        );
      }
    } else {
      console.error('Token is missing or invalid');
    }
  }

  updateUser(user: User): void {
    this.editingUser = { ...user };
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.fetchUsers());
  }

  toggleApproval(id: number): void {
    this.userService.toggleApproval(id).subscribe((updatedUser: User) => {
      const index = this.users.findIndex((u) => u.id === id);
      if (index !== -1) this.users[index].approuve = updatedUser.approuve;
      const filteredIndex = this.filteredUsers.findIndex((u) => u.id === id);
      if (filteredIndex !== -1) this.filteredUsers[filteredIndex].approuve = updatedUser.approuve;
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.editingUser = null;
    this.newUser = null;
  }
}
