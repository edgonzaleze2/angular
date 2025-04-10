import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  template: `
    <div class="product-container">
      <h2>Mantenimiento de Productos</h2>
      
      <div class="actions">
        <button (click)="showAddForm()" class="btn btn-primary">
          Nuevo Producto
        </button>
      </div>

      <app-product-form
        *ngIf="showForm"
        [editMode]="!!selectedProduct"
        [product]="selectedProduct"
        (save)="onSaveProduct($event)"
        (cancel)="cancelForm()"
      ></app-product-form>

      <div class="product-list">
        <div *ngIf="loading" class="loading">
          Cargando productos...
        </div>
        <div *ngIf="error" class="error">
          {{ error }}
        </div>
        <table *ngIf="!loading && !error">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{product.id}}</td>
              <td>{{product.name}}</td>
              <td>{{product.description}}</td>
              <td>{{product.price | currency}}</td>
              <td>{{product.stock}}</td>
              <td>
                <button (click)="editProduct(product)" class="btn btn-sm btn-primary">
                  Editar
                </button>
                <button (click)="deleteProduct(product.id)" class="btn btn-sm btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .product-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .actions {
      margin-bottom: 20px;
    }
    .product-list {
      margin-top: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
      font-weight: bold;
    }
    .btn-sm {
      padding: 4px 8px;
      margin: 0 4px;
    }
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    .loading, .error {
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .error {
      color: #dc3545;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  selectedProduct: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  showAddForm(): void {
    this.selectedProduct = null;
    this.showForm = true;
  }

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.showForm = true;
  }

  deleteProduct(id: number): void {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // La lista se actualizará automáticamente por el BehaviorSubject
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Error al eliminar el producto. Por favor, intente nuevamente.');
        }
      });
    }
  }

  onSaveProduct(productData: Omit<Product, 'id'>): void {
    if (this.selectedProduct) {
      this.productService.updateProduct({
        ...productData,
        id: this.selectedProduct.id
      }).subscribe({
        next: () => this.cancelForm(),
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Error al actualizar el producto. Por favor, intente nuevamente.');
        }
      });
    } else {
      this.productService.addProduct(productData).subscribe({
        next: () => this.cancelForm(),
        error: (err) => {
          console.error('Error creating product:', err);
          alert('Error al crear el producto. Por favor, intente nuevamente.');
        }
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.selectedProduct = null;
  }
}