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
- run test with browser GUI:  
  `npx playwright test --headed`
- viewing report  
  `npx playwright show-report`
- run Trace Viewer on zip file
  `npx playwright show-trace trace.zip`
