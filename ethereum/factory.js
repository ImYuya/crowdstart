// Tell web3 that a deployed copy of CampaignFactory exists.
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// Pass in Contract ABI & Address of already deployed contract.
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x3A6D1B699b2062c381863500eA7dfa275E9Cd2d4"
);

export default instance;
