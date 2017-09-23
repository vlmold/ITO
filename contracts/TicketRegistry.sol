pragma solidity ^0.4.0;

contract TicketRegistry{

    // Owner of this contract
    address public owner;

    string public constant name = "Concert Name";
    string public constant description = "Concert Description";
    
    uint maxAmount = 3; // number of tickets
    uint count = 1;
    
    mapping(uint => address) public ticketMap;
    
    //mapping(address => uint[]) public customers;
    
    // Constructor
    function Concert() {
         owner = msg.sender;
    }
    
    function  numberOfTickets() constant returns (uint){
        return count;
    }
    
    function transferTicket(address _to,uint _ticket) returns (bool){
        
        if(_ticket > maxAmount){
            throw;
        }
        
        if(msg.sender == owner && ticketMap[_ticket]==0){
            
            if(count > maxAmount){
                throw;
            }
            
            ticketMap[_ticket] = _to; 
            count++;
        }
        
        if(ticketMap[_ticket] == msg.sender){
            
            ticketMap[_ticket] == _to;
        }
  
        return true;
    }

}
