// Tell web3 that a deployed copy of CampaignFactory exists.
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// Pass in Contract ABI & Address of already deployed contract.
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xE25108272eAF8A6A689d6e97b5D54D63e3DEc0CF"
);

export default instance;
