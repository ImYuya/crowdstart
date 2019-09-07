pragma solidity  ^0.4.25;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(string campaign, string description, uint minimum) public {
        Campaign newCampaign = new Campaign(campaign, description, minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }

    function getCampaignName(Campaign campaignAddress) public view returns (string) {
        return campaignAddress.campaignName();
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

    struct Contribute {
        address contributer;
        uint amount;
    }

    Request[] public requests;
    Contribute[] public contributes;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string public campaignName;
    bool public finalizedCampaign;
    uint public totalAmount;
    string public campaignDescription;

    modifier restricted() {
        require(msg.sender == manager, "Sender not authorized.");
        _;
    }

    modifier isOpen() {
        require(!finalizedCampaign, "already finalized Campaign.");
        _;
    }

    constructor (string campaign, string description, uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        campaignName = campaign;
        campaignDescription = description;
        finalizedCampaign = false;
    }

    function contribute() public payable isOpen {
        require(msg.value > minimumContribution, "Value is less than minimumContribution.");
        approvers[msg.sender] = true;
        approversCount++;

        Contribute memory newContribute = Contribute({
            contributer: msg.sender,
            amount: msg.value
        });
        contributes.push(newContribute);

        totalAmount = totalAmount + msg.value;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted isOpen {
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
      uint, uint, uint, uint, address, string, bool, string
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager,
          campaignName,
          finalizedCampaign,
          campaignDescription
        );
    }

    function isMeManager(address selectedAddress) public view returns (bool) {
        if (manager == selectedAddress) {
            return true;
        } else {
            return false;
        }
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    function finalizeCampaign() public restricted isOpen returns (bool) {
        if (address(this).balance > 0) {
            uint _balanceNow = address(this).balance;
            for(uint i; i < contributes.length; i++) {
               contributes[i].contributer.transfer((contributes[i].amount * _balanceNow) / totalAmount);
            }
        }
        finalizedCampaign = true;
        return finalizedCampaign;
    }
}