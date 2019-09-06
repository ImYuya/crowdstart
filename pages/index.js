import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout";
import { Link } from "../routes";

const CampaignIndex = () => {
  const [campaigns, setCampaigns] = useState(null);

  useEffect(() => {
    (async () => {
      const _campaigns = await factory.methods.getDeployedCampaigns().call();
      const _items = await Promise.all(
        _campaigns.map(async address => {
          const campaignName = await factory.methods
            .getCampaignName(address)
            .call();
          const campaign = await Campaign(address);
          const finalisedCampaign = await campaign.methods.finalisedCampaign;
          console.log(web3.currentProvider.selectedAddress);
          const isManager = await campaign.methods.getSummary().call();
          console.log(isManager);
          // const summary = await campaign.methods.getSummary().call();
          // console.log(summary);
          const _item = {
            header: campaignName,
            meta: address,
            description: (
              <Link route={`/campaigns/${address}`}>
                <a>View Campaign</a>
              </Link>
            ),
            fluid: true,
            extra: finalisedCampaign ? (
              <div className="ui one buttons">
                <Button basic color="green">
                  Close
                </Button>
              </div>
            ) : null
          };
          // console.log(_item);
          return _item;
        })
      );
      setCampaigns(_items);
    })();
  }, []);

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
