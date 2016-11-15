/**
 * 
 * @author vy
 * @name ldelete_dropFunction
 */
Select ldel_dropFunction(:platypusUser, :schemaName, :tablename, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t