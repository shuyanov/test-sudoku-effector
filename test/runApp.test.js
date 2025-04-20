import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { Options } from 'selenium-webdriver/chrome.js';

describe('App', function () {
    let driver;

    this.timeout(30000);

    before(async function () {
        const options = new Options();
        options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await driver.get('http://localhost:5173');
    });

    after(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    it('Run App', async () => {
        const newGame = await driver.findElement(By.css('[data-testid="new-game"]'));
        expect(newGame).to.exist;
    });

    it('game complexity', async () => {
        const newGame = await driver.findElement(By.css('[data-testid="new-game"]'));
        await newGame.click();

        const gameComplexity = await driver.findElement(By.css('[data-testid="game-complexity-medium"]'));
        expect(gameComplexity).to.exist;
    });

    it('new game', async () => {
        const newGame = await driver.findElement(By.css('[data-testid="new-game"]'));
        await newGame.click();

        const gameComplexity = await driver.findElement(By.css('[data-testid="game-complexity-medium"]'));
        await gameComplexity.click();

        const error = await driver.findElement(By.css('[data-testid="error"]'));
        expect(error).to.exist;
    });
});
