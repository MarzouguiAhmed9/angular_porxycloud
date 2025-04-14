import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  isEditMode = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.itemId = params['id'];
        this.itemService.getItemById(this.itemId).subscribe(item => {
          this.itemForm.patchValue(item);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const itemData = this.itemForm.value;
      
      if (this.isEditMode && this.itemId) {
        this.itemService.updateItem(this.itemId, itemData).subscribe(() => {
          this.router.navigate(['/client/my-items']);
        });
      } else {
        this.itemService.createItem(itemData).subscribe(() => {
          this.router.navigate(['/client/my-items']);
        });
      }
    }
  }
}