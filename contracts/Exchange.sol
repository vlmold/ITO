pragma solidity ^0.4.0;

import "./TicketRegistry.sol";

contract Exchange {

    struct Proposal {
        TicketRegistryInterface ticketRegistryContract;
        uint ticketId;
        address refundAddress;
        address transferAddress;
    }

    Proposal[] proposals;
    bool proposalsFinalized = false;
    address owner;

    /// Create a new exchange with $(_numProposals) different proposals.
    function Exchange(uint8 _numProposals) {
        proposals.length = _numProposals;
        owner = msg.sender;
    }

    function setPropasal(uint8 proposalId, TicketRegistryInterface ticketRegistryContract, uint ticketId, address refundAddress, address transferAddress) {
        require(!proposalsFinalized);
        require(proposalId < proposals.length);
        require(ticketRegistryContract != address(0));
        require(refundAddress != 0);
        require(transferAddress != 0);
        proposals[proposalId].ticketRegistryContract = ticketRegistryContract;
        proposals[proposalId].ticketId = ticketId;
        proposals[proposalId].refundAddress = refundAddress;
        proposals[proposalId].transferAddress = transferAddress;
    }

    function finalizeProposals() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            require(proposals[proposalId].ticketRegistryContract != address(0));
        }
        proposalsFinalized = true;
    }

    function refund() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            if (proposals[proposalId].ticketRegistryContract != address(0))
            {
                TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
                //address tr = proposals[proposalId].ticketRegistryContract;
                if (tr.ticketMap(proposals[proposalId].ticketId) == address(this)) {
                    tr.transferTicket(proposals[proposalId].refundAddress, proposals[proposalId].ticketId);
                }
            }
		}
	    //selfdestruct(owner);
    }

    function transfer() {
        require(proposalsFinalized);
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            //TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
            require(proposals[proposalId].ticketRegistryContract.ticketMap(proposals[proposalId].ticketId) == address(this));
            proposals[proposalId].ticketRegistryContract.transferTicket(proposals[proposalId].transferAddress, proposals[proposalId].ticketId);
		}
		//selfdestruct(owner);
    }
}