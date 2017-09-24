pragma solidity ^0.4.0;

contract TicketRegistryInterface {
    mapping(uint => address) public ticketMap;
    function transferTicket(address _to, uint _ticketId) public returns (bool);
}

contract TicketRegistry is TicketRegistryInterface {

    // Owner of this contract
    address public owner;

    string public name;
    string public description;
    uint   public expDate;

    uint maxCount; // number of tickets
    uint count;

    mapping(uint => address) public ticketMap;

    // Constructor
    function TicketRegistry(string _name, string _description, uint _maxCount, uint _expDate) public {
         owner = msg.sender;
         name = _name;
         description = _description;
         maxCount = _maxCount;
         expDate = _expDate;
    }

    function numberOfAvailableTickets() public returns (uint) {
        return maxCount - count;
    }

    function transferTicket(address _to, uint _ticketId) public returns (bool) {
        // require(now < expDate);
        // require(_ticketId < maxCount);

        if(msg.sender == owner && ticketMap[_ticketId] == 0) {
            // require(count < maxCount);
            ticketMap[_ticketId] = _to;
            count++;
            return true;
        }

        if(ticketMap[_ticketId] == msg.sender) {
            ticketMap[_ticketId] = _to;
            return true;
        }

        return false;
    }

}