/**
 * 
 * @author vy
 * @name ldelete_createTrigger
 */
Select ldel_createTrigger(:platypusUser, :schemaName, :tablename, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t