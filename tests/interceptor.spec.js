const { test } = require('@playwright/test');

test('test', async ({ page }, testInfo) => {

    await page.on("request",req => {
        console.log(req.url);
    });

    await page.route("https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg", 
        (route) => route.abort()
    );

    await page.goto('https://www.saucedemo.com/');
    //login
    await page.getByRole('textbox',{name:'Username'}).fill('standard_user');
    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    await page.pause();
});