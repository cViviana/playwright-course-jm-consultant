const { test, expect } = require('@playwright/test');

test('test web table', async ({ page }) => {

    await page.goto('https://cosmocode.io/automation-practice-webtable/#google_vignette');

    const tableContainer = await page.locator("xpath=//table[@id='countries']");
    const rows = await tableContainer.locator("xpath=//tr").all();
    console.log(rows.length);
    const countries: Country [] = []
    for (let row of rows) {
        let country: Country = {
            name: await row.locator("xpath=//td[2]").innerText(),
            capital: await row.locator("xpath=//td[3]").innerText(),
            currency: await row.locator("xpath=//td[4]").innerText(),
            primaryLanguage: await row.locator("xpath=//td[5]").innerText()
        }
        countries.push(country);
    }

    /*for (let country of countries){
        console.log(country);
    }*/

    const countryWhereSpeakPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese');
    console.log(countryWhereSpeakPortuguese);
    /*const row1 = rows.at(1);
    
    const countryName = await row1.locator("xpath=//td[2]").innerText();
    const capitalName = await row1.locator("xpath=//td[3]").innerText();
    const currencyName = await row1.locator("xpath=//td[4]").innerText();

    console.log(countryName, capitalName, currencyName);*/
});

interface Country 
{
    name: string,
    capital: string,
    currency: string,
    primaryLanguage: string
}

/*
    //table[@id='countries']
    //tr -> filas
    
    //table[@id='countries']//tr[2]//td[1] -> Check
    //table[@id='countries']//tr[2]//td[2] -> Country
    //table[@id='countries']//tr[2]//td[3] -> Capital
    //table[@id='countries']//tr[2]//td[4] -> Currency
    //table[@id='countries']//tr[2]//td[5] -> Primary Language
*/