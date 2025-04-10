import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ editMode ? 'Editar' : 'Nuevo' }} Producto</h3>
          <button class="close-button" (click)="onCancel()">&times;</button>
        </div>
        <form (ngSubmit)="onSubmit()" #productForm="ngForm" class="product-form">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="productData.name"
              required
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              [(ngModel)]="productData.description"
              required
              class="form-control"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              [(ngModel)]="productData.price"
              required
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              [(ngModel)]="productData.stock"
              required
              class="form-control"
            >
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              {{ editMode ? 'Actualizar' : 'Crear' }} Producto
            </button>
            <button type="button" class="btn btn-secondary" (click)="onCancel()">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      margin: 0;
      color: #333;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      line-height: 1;
    }

    .close-button:hover {
      color: #333;
    }

    .product-form {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .form-actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }
  `]
})
export class ProductFormComponent {
  @Input() editMode = false;
  @Input() set product(value: Product | null) {
    if (value) {
      this.productData = { ...value };
    }
  }

  @Output() save = new EventEmitter<Omit<Product, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  productData: Omit<Product, 'id'> = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  onSubmit(): void {
    this.save.emit(this.productData);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}