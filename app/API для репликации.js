/**
 * @public
 * @author Work
 */
define('ReplicationAPI' , ['orm'], function (Orm, ModuleName) {
    return function () {
        var self = this
                , model = Orm.loadModel(ModuleName);

//        model.requery(function () {
//
//        });

        /* имя текущего пользователя Platypus (используется только для логирования) */
        var platypusUserName = "";//self.principal.name;

        /**
         * Получить код операции для записи логов
         * 
         * @returns {Число} id записи для таблицы лога операций
         */
        self.getActionId = function (aCallback) {
            var dataSource = model.dsGetActionId;
           // dataSource.params.execute = 1;

            dataSource.requery(function () {
                if (dataSource[0]) {
                    aCallback(dataSource[0].actionCode);return;
                }
                aCallback(null);return;
            });
        };

        function prepareReplicate(anId, aCallback) {
            var dataSource = model.dsResult;
            dataSource.push({});
            
            model.save(function () {
                aCallback(dataSource[dataSource.length-1].id);return;
            });
        }
        
        function logError(error) {
            
        }

        function getReplicateResult(anId, aCallback) {
            var dataSource = model.dsResult;
            dataSource.params.id = anId;
            dataSource.requery(function () {
                aCallback(dataSource[0].resultcode);return;
            });
        }

        /**
         * Генерация уникального имени схемы БД
         * 
         * @returns {Строка} имя схемы 
         */
        self.generateSchemaName = function (aCallback) {
            var dataSource = model.dsGenerateSchemaName;
            dataSource.params.execute = 1;
            dataSource.requery(function () {
                if (dataSource[0]) {
                    aCallback(dataSource[0].schemaName);return;
                }
                aCallback(null);return;
            });
        };

        /**
         * Узнать рабочую схему пользователя
         * 
         * @param {Строка} aPlatypusName пользователь Platypus
         * @returns {Строка} имя схемы
         */
        self.getUsrContext = function (aPlatypusName, aCallback) {
            var dataSource = model.dsGetUsrContext;
            dataSource.params.platypusUser = aPlatypusName;
            dataSource.requery(function () {
                if (dataSource.size === 1) {
                    aCallback(dataSource.schemaName);
                }
                aCallback(null);
            });
        };

        /**
         * Создать схему БД,
         * дать права и создать представления на все таблицы из REPLICATE_VIEWS,
         * создать последовательности с именами из таблицы REPLICATE_SEQUENCES
         * 
         * @param {Строка} aSchemaName имя создаваемой схемы
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.createSchema = function (aSchemaName, aCallBack) {
            var dataSource = model.dsCreateSchema;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.schemaName = aSchemaName;
                            dataSource.params.id = replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);return;
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);return;
                                });
                            });
                        } else
                            aCallBack(ret);return;
                    });
                } else
                    aCallBack(ret);return;
            });
        };

        /**
         * Удалить схему БД (данные из таблиц основной схемы для данного пользователя НЕ УДАЛЯЮТСЯ!!!)
         * 
         * @param {Строка} aSchemaName имя схемы
         * @returns {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         */
        self.dropSchema = function (aSchemaName, aCallBack) {
            var dataSource = model.dsDropSchema;
            var ret; //= {actionId: self.getActionId(), actionResult: null};
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.schemaName = aSchemaName;
                            dataSource.params.id = replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            });
                        } else
                            aCallBack(ret);
                    });
                } else
                    aCallBack(ret);
            });
        };

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
        self.createView = function (aSchemaName, aTableName, aCallBack) {
            var dataSource = model.dsCreateView;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.schemaName = aSchemaName;
                            dataSource.params.tableName = aTableName;
                            dataSource.params.id = +replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);return;
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);return;
                                });
                            });
                        } else
                            aCallBack(ret);return;
                    });
                } else
                    aCallBack(ret);return;
            });
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
        self.dropView = function (aSchemaName, aTableName, aCallBack) {
            var dataSource = model.dsDropView;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.schemaName = aSchemaName;
                            dataSource.params.tableName = aTableName;
                            dataSource.params.id = +replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            });
                        } else
                            aCallBack(ret);
                    });
                } else
                    aCallBack(ret);
            });
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
        self.createSequence = function (aSchemaName, aSequenceName, aCallBack) {
            var dataSource = model.dsCreateSequence;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.schemaName = aSchemaName;
                            dataSource.params.sequenceName = aSequenceName;
                            dataSource.params.id = +replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            });
                        } else
                            aCallBack(ret);
                    });
                } else
                    aCallBack(ret);
            });
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
        self.dropSequence = function (aSchemaName, aSequenceName, aCallBack) {
            var dataSource = model.dsDropSequence;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.schemaName = aSchemaName;
                            dataSource.params.sequenceName = aSequenceName;
                            dataSource.params.id = +replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            });
                        } else
                            aCallBack(ret);
                    });
                } else
                    aCallBack(ret);
            });
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
        self.addViewDefine = function (aTableName, aViewType, aNeedToRecreateView, aCallBack) {
            var dataSource = model.dsAddViewDefine;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.tableName = aTableName;
                            dataSource.params.viewType = aViewType;
                            dataSource.params.needToRecreateView = aNeedToRecreateView;
                            dataSource.params.id = replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);return;
                                });
                            }, function (e) {
                                    logError(e);
                                    aCallBack(e);return;
                            });
                    });
                } else
                    aCallBack(ret);return;
            });
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
        self.removeViewDefine = function (aTableName, aNeedToDropView, aCallBack) {
            var dataSource = model.dsRemoveViewDefine;
            var ret;
            self.getActionId(function (actId) {
                ret = {actionId: actId, actionResult: null};
                if (ret.actionId) {
                    prepareReplicate(ret.actionId, function (replicateId) {
                        if (replicateId) {
                            dataSource.params.execute = 1;
                            dataSource.params.actionId = +ret.actionId;
                            dataSource.params.platypusUser = platypusUserName;
                            dataSource.params.tableName = aTableName;
                            dataSource.params.needToDropView = aNeedToDropView;
                            dataSource.params.id = +replicateId;
                            dataSource.executeUpdate(function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            }, function () {
                                getReplicateResult(replicateId, function (actResult) {
                                    ret.actionResult = actResult;
                                    aCallBack(ret);
                                });
                            });
                        } else
                            aCallBack(ret);
                    });
                } else
                    aCallBack(ret);
            });
        };
    };
});
