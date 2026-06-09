import { test, expect } from '../../../src/fixtures/base.fixture';
import * as helper from '../../../src/utils/data-helpers';
import { APP_ROUTES } from '../../../src/constants/routes.constants.js';

// Navegación: Aseguramos que cada prueba inicie en el dashboard
test.beforeEach(async ({ page, loginPage }) => {

  loginPage.goto();
 
 await loginPage.login(
    process.env.TEST_APP_USERNAME as string,
    process.env.TEST_APP_PASSWORD as string,
  );

  await page.goto(APP_ROUTES.INDEX_PAGE);

  await page.waitForLoadState('networkidle');
});

test('Should create a new product successfully', async ({ page, productManagerPage }) => {
  


  const newProduct = helper.generateRandomProductData();


  await productManagerPage.createProduct(newProduct);


  await expect(page.getByRole('heading', { name: newProduct.name, level: 3 })).toBeVisible();

 await test.step('Filter and search product', async () => {

  await productManagerPage.filterByCategory(newProduct.category);

  const ProductCard = productManagerPage.getProductNameElement(newProduct.name);
  await expect(ProductCard).toBeVisible();
  await expect(ProductCard).toHaveText(newProduct.name);
 });

 await test.step('Delete the created product', async () => {
  await productManagerPage.selectProductCheckbox(newProduct.name);
  await productManagerPage.clickDeleteButton(newProduct.name);

  await productManagerPage.confirmDeletion();

  const deletionSuccessToast = productManagerPage.getSpecificSuccessToast(newProduct.name, 'deleted');
  await expect(deletionSuccessToast).toBeVisible();

  await expect(page.getByRole('heading', { name: newProduct.name, level: 3 })).not.toBeVisible();
 });

});
