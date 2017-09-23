pragma solidity ^0.4.0;

contract TicketRegistry {

    // Owner of this contract
    address public owner;

    string public name = "Event Name";
    string public description = "Event Description";
    uint   public expDate;
    
    uint maxAmount = 3; // number of tickets
    uint count = 0;
    
    mapping(uint => address) public ticketMap;
    
    
    // Constructor
    function TicketRegistry(string _name, string _description, uint _amount, uint _expDate) {
         owner = msg.sender;
         name = _name;
         description = _description;
         maxAmount = _amount;
         expDate = _expDate;
    }
    
    function  numberOfAvailableTickets() constant returns (uint) {
        return maxAmount - count;
    }
    
    function transferTicket(address _to,uint _ticket) returns (bool) {
        require(now < expDate);
        require(_ticket <= maxAmount);

        if (msg.sender == owner && ticketMap[_ticket]==0) {
            
            require(count < maxAmount);
            ticketMap[_ticket] = _to; 
            count++;
        }
        if (ticketMap[_ticket] == msg.sender) {
            ticketMap[_ticket] == _to;
        }
        return true;
    }

}
