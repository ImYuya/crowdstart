// Tell web3 that a deployed copy of CampaignFactory exists.
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// Pass in Contract ABI & Address of already deployed contract.
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa0D23c5F275c558388154b472f0ea52BAc08325b"
);

export default instance;
