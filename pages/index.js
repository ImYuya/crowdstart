import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout";
import { Link, Router } from "../routes";

const CampaignIndex = () => {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    (async () => {
      const _campaigns = await factory.methods.getDeployedCampaigns().call();
      const _items = await Promise.all(
        _campaigns.map(async (address, id) => createItems(address, id))
      );
      setCampaigns(_items);
    })();
  }, []);

  const createItems = async (address, id) => {
    const campaign = await Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    const campaignName = summary[5];
    const finalisedCampaign = summary[6];
    const campaignDescription = summary[7];
    const isMeManager = await campaign.methods
      .isMeManager(web3.currentProvider.selectedAddress)
      .call();

    console.log(id);
    const _item = {
      header: campaignName,
      meta: address,
      description: campaignDescription,
      onClick: () => {
        return Router.pushRoute(`/campaigns/${address}`);
      },
      fluid: true,
      extra: finalisedCampaign ? (
        <div className="ui green buttons" key={id}>
          <Button color="green">Closed</Button>
        </div>
      ) : isMeManager ? (
        <div className="ui red buttons" key={id}>
          <Button color="red" onClick={handleClose.bind(id, campaign)}>
            Close
          </Button>
        </div>
      ) : null
    };
    return _item;
  };

  const handleClose = async (campaign, temp) => {
    console.log(campaign);
    await campaign.methods.finalizeCampaign().send({
      from: web3.currentProvider.selectedAddress
      // gas: "1000000"
    });
    const summary = await campaign.methods.getSummary().call();

    if (summary[6] == true) {
      Router.pushRoute(`/`);
      console.log("Hello World");
    }
    console.log(summary);
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        <Card.Group items={campaigns} />
      </div>
    </Layout>
  );
};

export default CampaignIndex;
