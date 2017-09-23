pragma solidity ^0.4.0;
contract TicketRegistry {
    function getOwner(uint ticketId) public returns (address owner) {
        return 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
    }
    function setOwner(uint ticketId, address owner) public {
        //return 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
    }
}

contract Exchange {

    struct Proposal {
        address ticketRegistryContract;
        uint ticketId;
        address refundAddress;
        address transferAddress;
    }
    
    Proposal[] proposals;
    bool proposalsFinilized = false;

    /// Create a new exchange with $(_numProposals) different proposals.
    function Exchange(uint8 _numProposals) {
        proposals.length = _numProposals;
    }

    function setPropasal(uint8 proposalId, address ticketRegistryContract, uint ticketId, address refundAddress, address transferAddress) {
        require(proposalsFinilized);
        require(proposalId >= proposals.length);
        require(ticketRegistryContract == 0);
        require(refundAddress == 0);
        require(transferAddress == 0);
        proposals[proposalId].ticketRegistryContract = ticketRegistryContract;
        proposals[proposalId].ticketId = ticketId;
        proposals[proposalId].refundAddress = refundAddress;
        proposals[proposalId].transferAddress = transferAddress;
    }

    function finilizeProposals() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            if (proposals[proposalId].ticketRegistryContract == 0) throw;
        }
        proposalsFinilized = true;
    }

    function refund() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
	    	if (tr.getOwner(proposals[proposalId].ticketId) == address(this)) {
	    	    tr.setOwner(proposals[proposalId].ticketId, proposals[proposalId].refundAddress);
	    	}
		}
		//kill();
    }

    function transfer() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            checkProposal(proposalId);
            TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
	    	if (tr.getOwner(proposals[proposalId].ticketId) == address(this)) {
	    	    tr.setOwner(proposals[proposalId].ticketId, proposals[proposalId].transferAddress);
	    	}
		}
		//kill();
    }

    function checkProposal(uint8 proposalId) returns (bool successful) {
        if (proposalId >= proposals.length) throw;
        TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
		return tr.getOwner(proposals[proposalId].ticketId) == address(this);
    }
}
