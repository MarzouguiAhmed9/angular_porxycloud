import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/serviceUser/user.service';
import { ItemService } from '../../marketplace/item.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CurrencyPipe]
})
export class DashboardComponent implements OnInit {
  statistics: any;
  stats = {
    totalUsers: 0,
    pendingItems: 0,
    approvedItems: 0
  };
  
  pendingItems: any[] = [];
  isLoading = false;
  errorMessage = '';  activeTab: 'statistics' | 'pendingItems' = 'statistics';

  constructor(
    private userService: UserService, 
    private itemService: ItemService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserStatistics();
    this.loadStats();
    this.loadPendingItems();
  }

  setActiveTab(tab: 'statistics' | 'pendingItems'): void {
    this.activeTab = tab;
    if (tab === 'pendingItems') {
      this.loadPendingItems();
    }
  }

  getUserStatistics(): void {
    this.userService.getUserStatistics().subscribe(
      data => {
        this.statistics = data;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    );
  }

  loadStats(): void {
    this.userService.getUserStatistics().subscribe(data => {
      this.stats = data;
    });
  }

 
  loadPendingItems(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.itemService.getPendingItems().subscribe({
      next: (items) => {
        this.pendingItems = items;
        this.isLoading = false;
        console.log('Items chargés:', items); // Debug
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des items';
        this.isLoading = false;
        console.error('Erreur:', err); // Debug
      }
    });
  }


  formatPrice(price: number): string {
    return this.currencyPipe.transform(price, 'EUR', 'symbol', '1.2-2') || '';
  }
  approveItem(id: number): void {
    this.itemService.approveItem(id).subscribe({
      next: () => {
        this.showSuccessToast('Item approuvé avec succès');
        this.loadPendingItems(); // Recharger la liste
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.showErrorToast('Échec de l\'approbation');
      }
    });
  }
  
  rejectItem(id: number): void {
    this.itemService.rejectItem(id).subscribe({
      next: () => {
        this.showSuccessToast('Item rejeté avec succès');
        this.loadPendingItems(); // Recharger la liste
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.showErrorToast('Échec du rejet');
      }
    });
  }
  
  private showSuccessToast(message: string): void {
    // Implémentez votre toast/snackbar ou utilisez:
    alert(message); // Solution temporaire
  }
  
  private showErrorToast(message: string): void {
    alert(message); // Solution temporaire
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  list() {
    this.router.navigate(['/list']);
  }

  list2() {
    this.router.navigate(['/projet']);
  }
}