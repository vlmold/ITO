pragma solidity ^0.4.0;

import "./TicketRegistry.sol";

contract Exchange {

    struct Proposal {
        address ticketRegistryContract;
        uint ticketId;
        address refundAddress;
        address transferAddress;
    }

    Proposal[] proposals;
    bool proposalsFinilized = false;
    address owner;

    /// Create a new exchange with $(_numProposals) different proposals.
    function Exchange(uint8 _numProposals) {
        proposals.length = _numProposals;
        owner = msg.sender;
    }

    function setPropasal(uint8 proposalId, address ticketRegistryContract, uint ticketId, address refundAddress, address transferAddress) {
        require(!proposalsFinilized);
        require(proposalId < proposals.length);
        require(ticketRegistryContract != 0);
        require(refundAddress != 0);
        require(transferAddress != 0);
        proposals[proposalId].ticketRegistryContract = ticketRegistryContract;
        proposals[proposalId].ticketId = ticketId;
        proposals[proposalId].refundAddress = refundAddress;
        proposals[proposalId].transferAddress = transferAddress;
    }

    function finilizeProposals() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            require(proposals[proposalId].ticketRegistryContract != 0);
        }
        proposalsFinilized = true;
    }

    function refund() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
            if (tr.ticketMap(proposals[proposalId].ticketId) == address(this)) {
                tr.transfer(proposals[proposalId].ticketId, proposals[proposalId].refundAddress);
            }
		}
	    selfdestruct(owner);
    }

    function transfer() {
        for (uint8 proposalId = 0; proposalId < proposals.length; proposalId++) {
            TicketRegistry tr = TicketRegistry(proposals[proposalId].ticketRegistryContract);
            require(tr.ticketMap(proposals[proposalId].ticketId) == address(this));
            require(tr.transfer(proposals[proposalId].ticketId, proposals[proposalId].transferAddress));
		}
		selfdestruct(owner);
    }
}