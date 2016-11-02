/**
 * 
 * @author vy
 * @name replicate_getResult
 * @manual
 * @public
 * @rolesAllowed admin 

 */ 
Select 
   t.id as id,
   t.error_code as resultcode
From replicate_actions t
 Where :id = id