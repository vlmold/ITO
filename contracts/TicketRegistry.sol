pragma solidity ^0.4.0;

contract TicketRegistry{

    // Owner of this contract
    address public owner;

    string public name = "Concert Name";
    string public description = "Concert Description";
    uint   public expDate;
    
    uint maxAmount = 3; // number of tickets
    uint count = 1;
    
    mapping(uint => address) public ticketMap;
    
    //mapping(address => uint[]) public customers;
    
    // Constructor
    function TicketRegistry(string _name, string _description, uint _count, uint _expDate) {
         owner = msg.sender;
         
         name = _name;
         description = _description;
         count = _count;
         expDate = _expDate;
    }
    
    function  numberOfTickets() constant returns (uint){
        return count;
    }
    
    function transferTicket(address _to,uint _ticket) returns (bool){
        
        require(_ticket > maxAmount);
        
        if(msg.sender == owner && ticketMap[_ticket]==0){
            
            require(count > maxAmount);
            
            ticketMap[_ticket] = _to; 
            count++;
        }
        
        if(ticketMap[_ticket] == msg.sender){
            
            ticketMap[_ticket] == _to;
        }
  
        return true;
    }

}
