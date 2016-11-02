/**
 * @name 135849752056204
 * @manual
 * @public
 * @rolesAllowed admin 
 */ 
Select replicate_generateSchemaName() AS schemaName 
From (Select COUNT(*) 
From dummytable t1) t_generateSchemaName