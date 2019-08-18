// Tell web3 that a deployed copy of CampaignFactory exists.
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// Pass in Contract ABI & Address of already deployed contract.
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x010B3F971ddC803424158fC1baF2d459A95EC153"
);

export default instance;
