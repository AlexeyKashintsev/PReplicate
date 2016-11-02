/**
 * @name 135661218410989
 * @manual 
 * @public
 * @rolesAllowed admin 
 */
update replicate_actions t set error_code = 
(Select replicate_createSchema(:platypusUser, :schemaName, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_createSchema
) where id = :id