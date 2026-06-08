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
// Espera a que la app inicialice con el localStorage
  await page.waitForLoadState('networkidle');
});

test('Should create a new product successfully', async ({ page, productManagerPage }) => {

  // Arrange: Data ficticia con SKU dinámico
  const newProduct = helper.generateRandomProductData();

  // Act: Crear producto usando tu POM
  await productManagerPage.createProduct(newProduct);

  // Assert: Validar que el producto aparezca como un Heading Nivel 3
  await expect(page.getByRole('heading', { name: newProduct.name, level: 3 })).toBeVisible();


  const ProductCard = productManagerPage.getProductNameElement(newProduct.name);
  await expect(ProductCard).toBeVisible();
  await expect(ProductCard).toHaveText(newProduct.name);

  await productManagerPage.selectProductCheckbox(newProduct.name);
  await productManagerPage.clickDeleteButton(newProduct.name);

  await productManagerPage.confirmDeletion();

  const deletionSuccessToast = productManagerPage.getSpecificSuccessToast(newProduct.name, 'deleted');
  await expect(deletionSuccessToast).toBeVisible();

  await expect(page.getByRole('heading', { name: newProduct.name, level: 3 })).not.toBeVisible();


});
