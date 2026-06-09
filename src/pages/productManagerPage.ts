import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { IProductData } from '../types/product.type';
import { UI_SELECTORS } from '../constants/selectors.constants.js';


export class ProductManagerPage extends BasePage {
  // Form input locators (web-first accessibility)
  readonly productNameInput: Locator;
  readonly productSkuInput: Locator;
  readonly productPriceInput: Locator;
  readonly productCategorySelect: Locator;
  readonly productDescriptionInput: Locator;
  readonly saveProductButton: Locator;

  // Additional action locators
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly resetButton: Locator;
  readonly selectAll: Locator;
  readonly bulkDeleteButton: Locator;
  readonly successAlert: Locator;
  readonly productList: Locator;
  readonly deleteButtonConfirmation: Locator;
  readonly deleteSuccessAlert: Locator;


  constructor(page: Page) {
    super(page);

    // Form input locators (web-first accessibility based)
    this.productNameInput = page.locator('[id=product-name]');
    this.productSkuInput = page.locator('[id=product-sku]');
    this.productPriceInput = page.locator('[id=product-price]');
    this.productCategorySelect = page.locator('[id=product-category]');
    this.productDescriptionInput = page.locator('[id=product-description]');
    this.saveProductButton = page.getByRole('button', { name: 'Save' });

    // Additional action locators
    this.searchInput = page.locator('[id=search-input]');
    this.categoryFilter = page.locator('[id=category-filter]');
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.selectAll = page.locator('[id=select-all]');
    this.bulkDeleteButton = page.locator('[id=bulk-delete-btn]');

    this.successAlert =  page.locator('#toast-container');
    this.productList = page.locator('[id=product-list]');
    this.deleteButtonConfirmation = page.locator('[id=modal-confirm-btn]');

    this.deleteSuccessAlert = page.getByText('Success Product')
    
  }

  /**
   * Fills the product form with the provided product data and saves it.
   * @param product The product data to create
   */
  async createProduct(product: IProductData): Promise<void> {
    await this.writeText(this.productNameInput, product.name);
    await this.writeText(this.productSkuInput, product.sku);
    await this.writeText(this.productPriceInput, String(product.price));
    await this.productCategorySelect.selectOption(product.category);

    if (product.description) {
      await this.writeText(this.productDescriptionInput, product.description);
    }

    await this.clickElement(this.saveProductButton);
  }

  // En tu ProductManagerPage.ts
getProductCard(productName: string): Locator {
    // 2. Consumes la variable, eliminando el hardcode del método
    return this.productList.locator(UI_SELECTORS.PRODUCT_CARD, { hasText: productName });

    
  }

  getProductNameElement(productName: string) {
    const card = this.getProductCard(productName);
    

    return card.getByRole('heading', { 
      name: productName, 
      level: UI_SELECTORS.PRODUCT_TITLE_LEVEL 
    });
  }


  async selectProductCheckbox(productName: string) {
    // Busca el checkbox por su rol y su etiqueta accesible dinámica
    const checkbox = this.page.getByRole(UI_SELECTORS.CHECKBOX, { name: `Select ${productName}` });
    
    // Usamos check() en lugar de click() para checkboxes
    await checkbox.check();
  }

// En tu ProductManagerPage.ts
  async clickDeleteButton(productName: string) {
    // Busca un botón cuyo nombre accesible empiece con "Delete " seguido del producto

    const deleteButton = this.page.getByRole('button', { name: `Delete ${productName}` });
    await this.clickElement(deleteButton);
  }

  async confirmDeletion() {
    await this.clickElement(this.deleteButtonConfirmation);
  }

  getSpecificSuccessToast(productName: string, action: 'created' | 'deleted' | 'updated' = 'created'): Locator {
   
    const expectedMessage = `Success Product "${productName}" ${action} successfully`;
    

    return this.successAlert.filter({ hasText: expectedMessage });
  }

  async filterByCategory(category: string) {
    await this.categoryFilter.selectOption(category);
  }
}
