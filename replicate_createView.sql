/**
 * @name 135789130168722
 * @manual 
 * @public
 * @rolesAllowed admin 

 */ 
update replicate_actions t set error_code = 
(Select replicate_createView(:platypusUser, :schemaName, :tableName, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_createView
) where id = :id