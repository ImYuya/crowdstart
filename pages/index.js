import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
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
          const _item = {
            header: campaignName + " (contract::" + address + ")",
            description: (
              <Link route={`/campaigns/${address}`}>
                <a>View Campaign</a>
              </Link>
            ),
            fluid: true
          };
          console.log(_item);
          return _item;
        })
      );
      console.log(_items);
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
