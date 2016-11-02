/**
 * @name 135789288660988
 * @manual 
 * @public
 * @rolesAllowed admin 
 */ 
update replicate_actions t set error_code = 
(Select replicate_addViewDefine(:platypusUser, :tableName, :viewType, :needToRecreateView, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t_addViewDefine
) where id = :id