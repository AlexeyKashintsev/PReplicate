/**
 * @name 135660700473469
 * @manual
 * @public
 * @rolesAllowed admin 
 */ 
Select replicate_getActionId() AS actionCode 
From (Select COUNT(*) 
From dummytable t1) t__getActionId