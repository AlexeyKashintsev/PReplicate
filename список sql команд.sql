/**
 * 
 * @procedure 
 * @author vy
 * @name replicate_fakeCommit
 */
select 
 t.id as id,
 t.action_id as action_id,
 t.d as d,t.sqltext as sqltext,
 t.error_message as error_message,
 t.functionname as functionname 
from replicate_actions_sqls t  where :action = action_id 
order by t.d,t.id