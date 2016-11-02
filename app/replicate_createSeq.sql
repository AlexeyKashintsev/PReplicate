/**
 * @name 135789172414006
 * @manual 
 * @public
 * @rolesAllowed admin 

 */ 
update replicate_actions t set error_code = 
(Select replicate_createSequence(:platypusUser, :schemaName, :sequenceName, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_createSequence
) where id = :id