// Tell web3 that a deployed copy of CampaignFactory exists.
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// Pass in Contract ABI & Address of already deployed contract.
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xd3Df996ed59F0E67517c23203E8492cd6A2CE5F6"
);

export default instance;
