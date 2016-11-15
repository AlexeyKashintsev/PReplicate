/**
 * 
 * @author vy
 * @name ldelete_getCurrentSchema
 */
Select current_schema as schemaName
From (Select COUNT(*) 
From dummytable t1) t