import { expect, test } from '@playwright/test';
import { only } from 'node:test';

test('browseruiubasic', async ({ browser }) => {  
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://www.amazon.in/');
   console.log(await page.title());
});

test('pageuiubasic', async ({ page }) => {  
    const username = page.locator('#username');
    const signinbtn = page.locator('#signInBtn');
    const cardtitle = page.locator('.card-body a');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
// await expect(page).toHaveTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');
 await username.fill('rahulshett');
 await page.locator('#password').fill('Learning@830$3mK2');
 await signinbtn.click();
console.log(await page.locator("div.alert.alert-danger.col-md-12").textContent());
await expect(page.locator("div.alert.alert-danger.col-md-12")).toContainText('Incorrect');
await username.fill('');
await username.fill('rahulshettyacademy');
await signinbtn.click();
console.log(await cardtitle.nth(0).textContent());
const cardTitles = await cardtitle.allTextContents();
console.log(cardTitles);
});


test('ui conytrols', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   const username = page.locator('#username');
    const signinbtn = page.locator('#signInBtn');
    const blinktext = page.locator("body > div.float-right > a:nth-child(2)");
   const select = page.locator('select.form-control');
  await select.selectOption('consult');
  await page.locator('span.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  await expect(page.locator('#okayBtn')).toBeHidden();
 console.log(await page.locator('span.radiotextsty').last().isChecked());
  await expect(page.locator('span.radiotextsty').last()).toBeChecked();
  await expect (blinktext).toHaveAttribute('class','blinkingText');



//    await page.pause();

});

test ('childwindowshandling', async ({ browser }) => {  
    const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   
   // Use more specific selector: blinkingText link in float-right div
   const blinktext = page.locator('div.float-right a.blinkingText').first();
   
   // Ensure element is visible before clicking
   await blinktext.waitFor({ state: 'visible', timeout: 10000 });
   
   const [newpage] = await Promise.all([
       context.waitForEvent('page'),
       blinktext.click()
   ]);
   
   // Wait for the new page to load with network idle
   await newpage.waitForLoadState('networkidle');
   
   // Wait for any element containing username text (more flexible selector)
   const textLocator = newpage.locator('*:has-text("username")').first();
   await textLocator.waitFor({ state: 'visible', timeout: 15000 });
   
   // Extract domain from the credentials text
   const text = await textLocator.textContent();
   console.log("Credentials text:", text);
   
   // Extract domain with improved regex
   const usernameMatch = text.match(/username[:\s]+([^\s,]+)/i);
   const domain = usernameMatch ? usernameMatch[1] : text.split(/[\s,]+/)[0];
   
   // Fill username on original page
   await page.locator("#username").fill(domain);
   console.log("Filled username:", await page.locator("#username").inputValue());
});

test('Client App login', async ({page})=>{
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("anshika@gmail.com");
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
//    const titles = await page.locator("string=Login").allTextContents();
   const cardTitles = await page.locator(".card-body b").allTextContents();
   console.log(cardTitles);
});


   