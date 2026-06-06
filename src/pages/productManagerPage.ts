import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductManagerPage extends BasePage {
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly productName: Locator;
  readonly productSKU: Locator;
  readonly productPrice: Locator;
  readonly productCategory: Locator;
  readonly productInStock: Locator;
  readonly productDescription: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;
  readonly selectAll: Locator;
  readonly bulkDeleteButton: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.locator('[id=search-input]');
    this.categoryFilter = page.locator('[id=category-filter]');
    this.productName = page.locator('[id=product-name]');
    this.productSKU = page.locator('[id=product-sku]');
    this.productPrice = page.locator('[id=product-price]');
    this.productCategory = page.locator('[id=product-category]');
    this.productInStock = page.locator('[id=product-in-stock]');
    this.productDescription = page.locator('[id=product-description]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.selectAll = page.locator('[id=select-all]');
    this.bulkDeleteButton = page.locator('[id=bulk-delete-btn]');
  }
}
