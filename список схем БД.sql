/**
 * @name 135780635867102
 * @public
 * @rolesAllowed admin
 */ 
select usr_context as context, min(usr_name) as f2 from mtd_users where usr_context is not null group by usr_context order by upper(usr_context)