/**
 * @name 135789240187599
 * @manual 
 * @public
 * @rolesAllowed admin 

 */ 
update replicate_actions t set error_code = 
(Select replicate_dropSequence(:platypusUser, :schemaName, :sequenceName, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_dropSequence
) where id = :id