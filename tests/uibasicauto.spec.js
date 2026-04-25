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
   const blinktext = page.locator("body > div.float-right > a:nth-child(2)");
   
   const [newpage] = await Promise.all([
       context.waitForEvent('page'),
       blinktext.click()
   ]);
   
   // Wait for the new page to load
   await newpage.waitForLoadState('load');
   
   // Extract domain from the credentials text in the paragraph
   const text = await newpage.locator("#hero_section > div > div.hero_first_div > div.border_style > p").textContent({ timeout: 5000 });
   console.log("Credentials text:", text);
   
    // Extract domain - handles both credential text and banner text
    let domain;
    const usernameMatch = text.match(/username is (\S+)/);
    if (usernameMatch) {
        domain = usernameMatch[1];  // Extract from 'username is X'
    } else {
        domain = text.split(" ")[0];  // Extract first word (e.g., 'QASummit' from 'QASummit Chennai')
    }
   
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


   