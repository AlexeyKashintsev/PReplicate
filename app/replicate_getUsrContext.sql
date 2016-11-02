/**
 * @name 135849771953171
 * @public
 * @rolesAllowed admin 
 */ 
Select Distinct usr_context as schemaName
From mtd_users t
 Where usr_context is not null
 and upper(:platypusUser) = upper(t.usr_name)