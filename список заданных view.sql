/**
 * @name 135780931934378
 * @public
 * @rolesAllowed admin
 */
Select Lower(tablename) as tablename, tablename || '     ' ||(case when typ=0 then ' (все записи: только чтение)' when typ=1 then ' (все записи: чтение/запись)' when typ=2 then ' (только владелец: чтение/запись)' else ' (НЕИЗВЕСТНЫЙ ТИП)' end) as f2 From replicate_views t order by upper(tableName)