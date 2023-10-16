# Playwright Automation Testing with TypeScript

## Overview

This project showcases automated testing using Playwright with TypeScript. It includes tools like Applitools for visual testing, LambdaTest for cross-browser compatibility, and HyperTesting for testing in different environments. Additionally, Docker is utilized for easy containerized deployment.

## Getting Started

Follow these steps to set up and run the project locally:

1.  Clone the repository:
    
    `https://github.com/vijayalien/Playwright-ts-lambdatest.git` 
    
2.  Navigate to the project directory:
    
    `cd playwright-automation` 
    
3.  Install the necessary dependencies:
       
    `npm ci` 
    
4.  Create a `.env` file at the root of the project and add the following:
    
    
    `# Applitools API Key
    APPLITOOLS_API_KEY=your_api_key_here
    
    # LambdaTest Credentials
    LAMBDATEST_USER=your_username
    LAMBDATEST_ACCESSKEY=your_api_key` 
    
5.  Install Playwright:
  
   
    `npx playwright install` 
    
6.  Run the tests:
        
    `npx playwright test` 
    

## Tools Used

-   **Applitools for Visual Testing**: Applitools helps identify visual discrepancies between expected and actual results.
    
-   **LambdaTest for Cross-Browser Testing**: LambdaTest is used to perform tests on various browsers and operating systems and  HyperTesting allows testing in different environments to ensure application compatibility.
    
-   **Docker for Containerized Deployment**: Docker makes it easy to package the application and its dependencies for consistent deployment.
    

## Notes

-   Make sure to replace `your_api_key_here`, `your_username`, and `your_api_key` in the `.env` file with your actual credentials.
    
-   For more information about each tool and their usage, refer to their respective documentation.
