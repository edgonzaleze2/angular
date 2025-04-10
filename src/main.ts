import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ProductListComponent } from './app/components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <h1>Sistema de Gestión de Productos</h1>
      <app-product-list></app-product-list>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    h1 {
      text-align: center;
      padding: 20px;
      margin: 0;
      color: #333;
    }
  `],
  imports: [ProductListComponent],
  standalone: true
})
export class App {
}

bootstrapApplication(App);