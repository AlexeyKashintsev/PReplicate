/**
 * 
 * @author vy
 * @name ldelete_createFunction
 */
Select ldel_createFunction(:platypusUser, :schemaName, :tablename, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t