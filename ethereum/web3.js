// Configure web3 with a provider from metamask.
import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metamask is running
  // Modern dapp browsers
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      ethereum.enable();
    } catch (error) {
      // User denied account access
    }
    // Legacy dapp browsers
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
} else {
  // We are on the server OR the user is not running metamask.
  // We create our own provider that is accessing the network on this URL.
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/HVB3TKGffxRXAzLMp9vh"
  );
  // Pass our provider to web3.
  web3 = new Web3(provider);
}

export default web3;

// window.addEventListener(‘load’, async () => {
//   // Modern dapp browsers
//   if (window.ethereum) {
//     window.web3 = new Web3(ethereum);
//     try {
//       // Request account access if needed
//       await ethereum.enable();
//     } catch (error) {
//       // User denied account access
//     }
//     // Legacy dapp browsers
//   } else if (window.web3) {
//     window.web3 = new Web3(web3.currentProvider);
//   }
//   // Non-dapp browsers
//   else {
//     // Handle the case where the user doesn’t have Non-Ethereum
//     console.log(‘No web3 ? You should consider trying MetaMask!’);
//   }
//   // Now you can start your app & access web3 freely
//   startApp()
// })
