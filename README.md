# CryptoExtension 

Project for AP Comp Sci Principles
## Description

CryptoExtension is a Google Chrome extension popup that allows you to make online payments with
cryptocurrency all within one browser window.
## How to use

1. The first thing you need to do is log into or make a Google account and make sure that it is syncing data with your
chrome browser. The extension saved your data in your Google account. 

2. Now you need to log into your wallet account and make an API key for the extension so that it can access your wallet.
You can see how exactly to do this by going down to the Make API Keys section.

3. The next thing you need to do is add your wallet API keys (Currently only supports Coinpayment wallets).
You can do this by opening up the extension popup and clicking on the gear icon in the lower right corner. 
This will open up the settings page. The first tab in the settings page is the tab to enter your API keys
(Different pages can be accessed through the bottom menu bar). You need to enter both your public and private
API keys. These will be saved in your Google account.

4. You can now manage your API keys by going to the 'Manage Keys' tab. Click on a API key to select it and click 
the button to remove it. 

5. Once you have your API keys setup and entered, you can now use the extension. The extension itself will run you through this. 
#### Steps
1. First you enter in the address you want to send the money to.
2. Next you enter the amount, and the type of coin to use.
3. The extension will then give you your options for what wallets your can use.
4. Once one is selected the extension will prompt you to confirm that the transaction data is correct. At the same time
you can choose to use autoconfirm (No email confirmation needed) or not. To use it the API will need permission to do so.
5. After confirming the transaction, the extension will make the API call to make the transaction. The extension will confirm a
successful transaction call or will ask for an email confirmation.

#### Make API Keys
### Supported Wallets
* Coinpayments
## Acknowledgments
I am using Caligatio's code for javascript SHA hashing. https://github.com/Caligatio/jsSHA
