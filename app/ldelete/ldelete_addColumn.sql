/**
 * 
 * @author vy
 * @name ldelete_columnName
  * @manual 
 * @public
 * @rolesAllowed admin 
 */ 
Select ldel_addcolumn(:platypusUser, :schemaName, :tablename, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t