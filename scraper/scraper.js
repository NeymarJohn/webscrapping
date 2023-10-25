const puppeteer = require('puppeteer');
const config = require('./config');

async function startScraping() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    try {
        // await page.goto(config.url);
        // console.log('page Loading --------------------');
        // await page.waitForSelector('header');
        // console.log('page Loading completed --------------------');
        
        // // ------------------ Open signup form
        // const loginLink = await page.$('header .IDaDx a.sOtnj');
        // const loginHref = await loginLink.evaluate((element) => element.getAttribute('href'));
        // console.log('loginLink: ', loginHref);

        const loginHref = '/RegistrationController?flow=sign_up_and_save&returnTo=%2FHotel_Review-g6528667-d6480605-Reviews-Le_Chevalier_Bay_Guesthouse-Anse_Lazio_Praslin_Island.html&fullscreen=true&flowOrigin=login&hideNavigation=true&isLithium=true';
        await page.goto("https://www.tripadvisor.de/" + loginHref);
        await page.waitForSelector('#signupSigninWrapper .regEmailContinue');
        // ------------------- completed to open the signup form

        // ------------------- Set register Form
        await page.type(".signUpBody .colLeft .text", "Neymar", {
          delay: 5
        });
        await page.type(".signUpBody .colRight .text", "John", {
          delay: 5
        });
        await page.type(".signUpBody .emailAddr", "finalFantasy0217@gmail.com", {
            delay: 5
        });
        await page.type(".signUpBody .ui_label_group .ui_input_text", "!QAZxsw2#EDC", {
            delay: 5
        });
        console.log("signup information putting finished---------------");
        // const selector = await page.$('.signUpBody .colRight .text');
        // const signUpButton = await selector.evaluate((element) => element.getAttribute('id'));
        // console.log("signup information", signUpButton);
        
        await page.click('.signUpBody .regSubmitBtnEvent');
        await page.waitForNavigation();
        
        await page.screenshot({path: './screenshot_5_logout.png'});
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // await browser.close();
    }
}

// async function scrapePetDetails(url) {
//     if (!url) {
//         return;
//     }

//     const parts = url.split("/");
//     const petType = parts[3]; // "dog" or "cat"
//     if (petType != "dog" && petType != "cat") {
//         console.log("The URL does not clearly specify if it's about a dog or a cat.");
//         return;
//     }

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.setDefaultNavigationTimeout(0);

//     try {
//         await page.goto(url);

//         // Wait for the pet listings to load
//         await page.waitForSelector('.site-main');

//         // Extract the image link
//         let photolinks = '';
//         const petCarousels = await page.$$('.petCarousel-body img');
//         for (const carousel of petCarousels) {
//             const imgSrc = await carousel.evaluate((element) => element.getAttribute('src'));
//             if (imgSrc) {
//                 // Join the URLs with commas to create the combined string
//                 photolinks = photolinks + (photolinks != '' ? ',' : '') + imgSrc;
//             }
//         }

//         // Extract the details
//         const detailCard = await page.$('.card_divide');

//         const name = await detailCard.$('#Detail_Main [data-test="Pet_Name"]');
//         const location = await detailCard.$('#Detail_Main [data-test="Pet_Location"]');
//         const breeds = await detailCard.$('[data-test="Pet_Breeds"]');
//         const age = await detailCard.$('[data-test="Pet_Age"]');
//         const sex = await detailCard.$('[data-test="Pet_Sex"]');
//         const grownSize = await detailCard.$('[data-test="Pet_Full_Grown_Size"]');
//         const color = await detailCard.$('[data-test="Pet_Primary_Color"]');
//         const story = await detailCard.$('[data-test="Pet_Story_Section"] div.u-vr4x');

//         const animalId = await page.$('.petCarousel');
//         const email = await page.$('.card_org [href^="mailto:"]');
//         const phone = await page.$('.card_org [href^="tel:"] [itemprop="telephone"]');
//         const owner = await page.$('.card_org .txt_h2 span[itemprop="name"]');

//         const animalIdText = animalId ? await animalId.evaluate((el) => el.getAttribute('animal-id')) : '';
//         const emailText = email ? await email.evaluate((el) => el.textContent) : '';
//         const phoneText = phone ? await phone.evaluate((el) => el.textContent) : '';
//         const ownerText = owner ? await owner.evaluate((el) => el.textContent) : '';

//         // Extract the text content
//         const nameText = name ? await name.evaluate((el) => el.textContent) : '';
//         const locationText = location ? await location.evaluate((el) => el.textContent) : '';
//         const breedsText = breeds ? await breeds.evaluate((el) => el.textContent) : '';
//         const ageText = age ? await age.evaluate((el) => el.textContent) : '';
//         const sexText = sex ? await sex.evaluate((el) => el.textContent) : '';
//         const grownSizeText = grownSize ? await grownSize.evaluate((el) => el.textContent) : '';
//         const colorText = color ? await color.evaluate((el) => el.textContent) : '';
//         const storyText = story ? await story.evaluate((el) => el.textContent) : '';
       

//         // Save the data to the database or process it as needed
//         const data = {
//             name: nameText ? nameText.trim() : null,
//             type: petType ? petType.trim() : null,
//             owner: ownerText ? ownerText.trim() : null,
//             location: locationText ? locationText.trim() : null,
//             breeds: breedsText ? breedsText.trim() : null,
//             age: ageText ? ageText.trim() : null,
//             sex: sexText ? sexText.trim().toLowerCase() : null,
//             size: nameText ? grownSizeText.trim() : null,
//             color: colorText ? colorText.trim() : null,
//             story: storyText ? storyText.trim() : null,
//             animalId: animalIdText ? animalIdText.trim() : null,
//             email: emailText ? emailText.trim() : null,
//             phone: phoneText ? phoneText.trim() : null,
//             photolinks: photolinks,
//             url: url,
//         };

//         await saveToDatabase(data);
//     } catch (error) {
//         console.error('An error occurred:', error);
//     } finally {
//         await browser.close();
//     }
// }

// async function saveToDatabase(data) {
//     let conn = null;
//     try {
//         conn = await db.getConnection();

//         await conn.execute('INSERT INTO pets (type, owner, name, location, breeds, age, sex, size, color, story, animal_id, email, phone, photos, url, created_at) \
//                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, NOW())', [
//             data.type,
//             data.owner,
//             data.name,
//             data.location,
//             data.breeds,
//             data.age,
//             data.sex,
//             data.size,
//             data.color,
//             data.story,
//             data.animalId,
//             data.email,
//             data.phone,
//             data.photolinks,
//             data.url
//         ]);
//         console.log('Data saved to the database.');
//     } catch (error) {
//         console.error('Error saving data to the database:', error);
//     } finally {
//         if (conn) {
//             db.release(conn);
//         }
//     }
// }


module.exports = { startScraping };