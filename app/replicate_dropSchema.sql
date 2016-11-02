/**
 * @name 135789202345338
 * @manual 
 * @public
 * @rolesAllowed admin 

 */ 
update replicate_actions t set error_code = 
(Select replicate_dropSchema(:platypusUser, :schemaName, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_dropSchema
) where id = :id