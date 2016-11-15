/**
 * 
 * @author vy
 * @name ldelete_dropTrigger
 */
Select ldel_dropTrigger(:platypusUser, :schemaName, :tablename, :actionId) AS actionResult 
From (Select COUNT(*) 
From dummytable t1) t