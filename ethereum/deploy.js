const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const private = require("./private.js");

// プロバイダ設定の参考　（ニーモニックは問題無い物を使用）
// const provider = new HDWalletProvider(
//   "call glow acoustic vintage front ring trade assist shuffle mimic volume reject",
//   "https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q"
// );

const provider = new HDWalletProvider(private.mnemonic, private.provider);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  process.exit(1);
};
deploy();
