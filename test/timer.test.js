import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Timer component', function () {
  let driver;

  this.timeout(20000);

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:5173');
  });

  after(async () => {
    await driver.quit();
  });

  it('should render timer and toggle play/pause', async () => {
    const newGame = await driver.findElement(By.css('[data-testid="new-game"]'));
    await newGame.click();

    const gameComplexity = await driver.findElement(By.css('[data-testid="game-complexity-medium"]'));
    await gameComplexity.click();

    const timerText = await driver.findElement(By.css('[data-testid="timer-time"]'));
    const timerButton = await driver.findElement(By.css('[data-testid="timer-button"]'));
    const timerIcon = await driver.findElement(By.css('[data-testid="timer-icon"]'));
    const svgIcon = await timerIcon.findElement(By.css('[data-testid="svg-timer"]'));

    const initialTime = await timerText.getText();
    const iconName = await svgIcon.getAttribute('xlink:href');

    expect(iconName).to.equal('/sprites/common.svg#pause');

    await driver.sleep(2000);

    const updatedTime = await timerText.getText();
    expect(updatedTime).to.not.equal(initialTime);

    await timerButton.click();
    const iconNameAfter = await timerIcon.findElement(By.css('[data-testid="svg-timer"]')).getAttribute('xlink:href');
    expect(iconNameAfter).to.equal('/sprites/common.svg#play');
  });
});
