import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductManagerPage extends BasePage {


    private readonly searchInput: Locator;
    private readonly categoryFilter: Locator;
    private readonly productName: Locator;
    private readonly productSKU: Locator;
    private readonly productPrice: Locator;
    private readonly productCategory: Locator;
    private readonly productInStock: Locator;
    private readonly productDescription: Locator;
    private readonly saveButton: Locator;
    private readonly resetButton: Locator;
    private readonly selectAll: Locator;
    private readonly bulkDeleteButton: Locator;






    constructor(page:Page){
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
