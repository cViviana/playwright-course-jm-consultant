const { test, expect } = require('@playwright/test');

test('carrito-de-compra', async ({ page }, testInfo) => {

    await page.goto('https://www.saucedemo.com/');
    //login
    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();
    //await page.screenshot({path: 'screenshots/login2.png', fullPage: true});
    
    await testInfo.attach('login',{
        body: await page.screenshot(),
        contenType: 'image/png'
    });
    
    //interacción con el contenido
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
    //obtener index random
    const randomIndex = Math.floor(Math.random()*itemsContainer.length);
    //obtener item random
    const randomItem = itemsContainer[randomIndex];
    //obtener las propiedades
    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();
    //imprimir valores
    //console.log('Name: ', expectedName);
    //console.log('Description: ', expectedDescription);
    //console.log('Price: ', expectedPrice);
    console.log(`Name: ${expectedName} - Description: ${expectedDescription} - Price: ${expectedPrice} `);
    //Botón add cart
    await randomItem.getByRole('button',{name: 'Add to cart'}).click();
    //Ver carrito
    await page.locator('a.shopping_cart_link').click();
    //Esperar al botón checkout
    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();
    //Comparación del elemento seleccionado
    const actualName = await page.locator('div.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();
    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
    expect(actualPrice).toEqual(expectedPrice);

    //await page.pause();
});