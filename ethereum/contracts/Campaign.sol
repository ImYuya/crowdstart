pragma solidity  ^0.4.25;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(string campaign,uint minimum) public {
        Campaign newCampaign = new Campaign(campaign, minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
    
    function getCampaignName(Campaign campaignAddress) public view returns (string) {
        return campaignAddress.getCampaignName();
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string campaignName;

    modifier restricted() {
        require(msg.sender == manager, "Sender not authorized.");
        _;
    }

    constructor (string campaign, uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        campaignName = campaign;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "Value is less than minimumContribution.");
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // Make sure calling this function has donated
        require(approvers[msg.sender], "Sender is not an approver");
        // Make sure calling this function hasn't voted before
        require(!request.approvals[msg.sender], "Sender has already approved !");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2), "ApprovalCount is less than half");
        require(!request.complete,"This request has already completed !");

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address, string
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager,
          campaignName
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
    function getCampaignName() public view returns (string) {
        return campaignName;
    }
}
