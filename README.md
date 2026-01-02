# Test Automation training form jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright:  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
  `npx playwright test`
- run tests multiple times:  
  `npx playwright test --repeat-each=10`
- run tests repeate if test failed:  
  `npx playwright test --retires=3`
- run test with browser GUI:  
  `npx playwright test --headed`
- viewing report  
  `npx playwright show-report`
- run Trace Viewer on zip file
  `npx playwright show-trace test-results/payment-Payment-tests-simple-payment-chromium/trace.zip`
  `npx playwright show-trace trace.zip` when in folder with trace.zip file

  ## Playwright selector types

- By Role
  `await page.getByRole('button', { name: 'Submit' }).click();`

- By Text
  `await page.getByText('Welcome').click();`

- By Label
  `await page.getByLabel('Username').fill('JohnDoe');`

- By Placeholder
  `await page.getByPlaceholder('Enter your name').fill('John');`

- By Alt Text
  `await page.getByAltText('Profile picture').click();`

- By Title
  `await page.getByTitle('Close').click();`

- By Test ID
  `await page.getByTestId('submit-button').click();`
