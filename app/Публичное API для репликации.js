/**
 * @public
 * @author Work
 * @module teeest
 */
define(['orm', 'rpc', 'ReplicationAPI'], function (Orm, Rpc, ReplicationAPI, ModuleName) {
    return function () {
        var self = this
                , model = Orm.loadModel(ModuleName);
        
        model.requery(function () {
            
        });
        
        var replicateModule = new ReplicationAPI();

        /**
         * Создать представление к таблице
         *
         * @param {Строка} aSchemaName имя  схемы
         *                 (если значение не задано, то все схемы из MTD_USERS )
         * @param {Строка} aTableName  имя таблицы для задания прав доступа к ней и создания представления 
         *                 (если значение не задано, то все имена таблиц из REPLICATE_VIEWS )
         *              
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.createView = function(aSchemaName, aTableName) {
            return replicateModule.createView(aSchemaName, aTableName);
        };

        /**
         * Удалить представление к таблице
         * 
         * @param {Строка} aSchemaName имя  схемы
         *                 (если значение не задано, то все схемы из MTD_USERS )
         * @param {Строка} aTableName имя таблицы (представления) 
         *                 (если значение не задано, то все имена таблиц из REPLICATE_VIEWS )
         *
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.dropView = function(aSchemaName, aTableName) {
            return replicateModule.dropView(aSchemaName, aTableName);
        };

        /**
         * Создать последовательность.
         * (Нумерация каждой последовательности в каждой схеме начинается с 1)
         * 
         * @param {Строка} aSchemaName  имя  схемы
         *                     (если значение не задано, то все схемы из MTD_USERS )
         * @param {Строка} aSequenceName  имя последовательности
         *                 (если значение не задано, то все имена из REPLICATE_SEQUENCES )
         *                 
         *
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.createSequence = function(aSchemaName, aSequenceName) {
            return replicateModule.createSequence(aSchemaName, aSequenceName);
        };

        /**
         * Удалить последовательность
         * 
         * @param {Строка} aSchemaName  имя  схемы
         *                     (если значение не задано, то все схемы из MTD_USERS )
         * @param {Строка} aSequenceName  имя последовательности
         *                 (если значение не задано, то все имена из REPLICATE_SEQUENCES )
         *                 
         *
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.dropSequence = function(aSchemaName, aSequenceName) {
            return replicateModule.dropSequence(aSchemaName, aSequenceName);
        };


        /**
         * Добавить/изменить описание представления
         * 
         * @param {Строка} aTableName  имя таблицы для репликации 
         *              (проверка в списке существующих таблиц не осуществляется)
         *              
         * @param {Число} aViewType  тип создаваемых преставлений
         *                 (0 - все записи: только для чтения
         *                  1 - все записи: полный доступ
         *                  2 - разделение по пользователям: полный доступ
         *                      (в таблицу добавляется поле для условия разделения))
         *                      
         * @param {Число} aNeedToRecreateView   необходимость создать представление во всех схемах, имеющихся в MTD_USERS
         *                       ( >0 - пересоздать, иначе не пересоздавать)
         *
         *
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.addViewDefine = function(aTableName, aViewType, aNeedToRecreateView) {
            return replicateModule.addViewDefine(aTableName, aViewType, aNeedToRecreateView);
        };

        /**
         * Удалить описание представления
         * 
         * @param {Число} aTableName  имя таблицы для репликации 
         * 
         * @param {Число} aNeedToDropView   необходимость удаления представления во всех схемах Oracle, имеющихся в MTD_USERS
         *                   ( >0 - удалить, иначе не удалять)
         *
         *
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.removeViewDefine = function(aTableName, aNeedToDropView) {
            return replicateModule.removeViewDefine(aTableName, aNeedToDropView);
        };
     };
});
