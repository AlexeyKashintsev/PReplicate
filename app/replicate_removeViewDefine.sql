/**
 * @name 135789261543758
 * @manual 
 * @public
 * @rolesAllowed admin 
 */ 
update replicate_actions t set error_code = 
(Select replicate_removeViewDefine(:platypusUser, :tableName, :needToDropView, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_removeViewDefine
) where id = :id