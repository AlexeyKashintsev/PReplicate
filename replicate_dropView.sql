/**
 * @name 135789226175018
 * @manual 
 * @public
 * @rolesAllowed admin 

 */ 
update replicate_actions t set error_code = 
(Select replicate_dropView(:platypusUser, :schemaName, :tableName, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_dropView
) where id = :id