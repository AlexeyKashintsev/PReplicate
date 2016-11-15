/**
 * 
 * @author vy
 */
define('LDeleteAPI' , ['orm'], function (Orm, ModuleName) {
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

            dataSource.requery(function () {
                if (dataSource[0]) {
                    aCallback(dataSource[0].actionCode);return;
                }
                aCallback(null);return;
            });
        };

        
        function logError(error) {
            
        }



        /**
         * Добавить колонку-признак логического удаления
         * 
         * 
         * @param {Число} aSchemaName  Схема расположения таблицы
         * @param {Число} aTableName  имя таблицы 
         * 
         */
        self.addColumn = function (aSchemaName, aTableName) {//, aCallBack) {
            var dataOperation = model.ldelete_columnName;//dsLDelete_columnName;
            var resultOperation = model.ldel_resultOperaition;
            var ret;
            self.getActionId(function (actId) {

                ret = {actionId: actId, actionResult: null};

                if (ret.actionId) {
                    
                    dataOperation.params.platypusUser = platypusUserName;
                    dataOperation.params.schemaName = aSchemaName;
                    dataOperation.params.tablename = aTableName;
                    dataOperation.params.actionId = ret.actionId;

                    dataOperation.execute(function(){
                        resultOperation.params.actionId = ret.actionId;
                        resultOperation.requery(function(){
                            if (resultOperation[0]) {
                                ret.actionResult = resultOperation[0].resultCode;//actionCode;
                            }
                            showResult(ret);
                        }, function(){
                            showResult(ret);
                        });
                    }, function(){
                       showResult(ret);
                    });
                } else {
                    showResult(ret);
                }
            });
        };


        /**
         * Создать триггерную функцию
         * 
         * 
         * @param {Число} aSchemaName  Схема расположения таблицы
         * @param {Число} aTableName  имя таблицы 
         * 
         */
        self.createFunction = function (aSchemaName, aTableName) {
            var dataOperation = model.ldelete_createFunction;
            var resultOperation = model.ldel_resultOperaition;
            var ret;
            self.getActionId(function (actId) {

                ret = {actionId: actId, actionResult: null};

                if (ret.actionId) {
                    
                    dataOperation.params.platypusUser = platypusUserName;
                    dataOperation.params.schemaName = aSchemaName;
                    dataOperation.params.tablename = aTableName;
                    dataOperation.params.actionId = ret.actionId;

                    dataOperation.execute(function(){
                        resultOperation.params.actionId = ret.actionId;
                        resultOperation.requery(function(){
                            if (resultOperation[0]) {
                                ret.actionResult = resultOperation[0].resultCode;
                            }
                            showResult(ret);
                        }, function(){
                            showResult(ret);
                        });
                    }, function(){
                       showResult(ret);
                    });
                } else {
                    showResult(ret);
                }
            });
        };

        /**
         * Создать триггер
         * 
         * 
         * @param {Число} aSchemaName  Схема расположения таблицы
         * @param {Число} aTableName  имя таблицы 
         * 
         */
        self.createTrigger = function (aSchemaName, aTableName) {
            var dataOperation = model.ldelete_createTrigger;
            var resultOperation = model.ldel_resultOperaition;
            var ret;
            self.getActionId(function (actId) {

                ret = {actionId: actId, actionResult: null};

                if (ret.actionId) {
                    
                    dataOperation.params.platypusUser = platypusUserName;
                    dataOperation.params.schemaName = aSchemaName;
                    dataOperation.params.tablename = aTableName;
                    dataOperation.params.actionId = ret.actionId;

                    dataOperation.execute(function(){
                        resultOperation.params.actionId = ret.actionId;
                        resultOperation.requery(function(){
                            if (resultOperation[0]) {
                                ret.actionResult = resultOperation[0].resultCode;
                            }
                            showResult(ret);
                        }, function(){
                            showResult(ret);
                        });
                    }, function(){
                       showResult(ret);
                    });
                } else {
                    showResult(ret);
                }
            });
        };

        /**
         * Удалить триггерную функцию
         * 
         * 
         * @param {Число} aSchemaName  Схема расположения таблицы
         * @param {Число} aTableName  имя таблицы 
         * 
         */
        self.dropFunction = function (aSchemaName, aTableName) {
            var dataOperation = model.ldelete_dropFunction;
            var resultOperation = model.ldel_resultOperaition;
            var ret;
            self.getActionId(function (actId) {

                ret = {actionId: actId, actionResult: null};

                if (ret.actionId) {
                    
                    dataOperation.params.platypusUser = platypusUserName;
                    dataOperation.params.schemaName = aSchemaName;
                    dataOperation.params.tablename = aTableName;
                    dataOperation.params.actionId = ret.actionId;

                    dataOperation.execute(function(){
                        resultOperation.params.actionId = ret.actionId;
                        resultOperation.requery(function(){
                            if (resultOperation[0]) {
                                ret.actionResult = resultOperation[0].resultCode;
                            }
                            showResult(ret);
                        }, function(){
                            showResult(ret);
                        });
                    }, function(){
                       showResult(ret);
                    });
                } else {
                    showResult(ret);
                }
            });
        };

        /**
         * Удалить триггер
         * 
         * 
         * @param {Число} aSchemaName  Схема расположения таблицы
         * @param {Число} aTableName  имя таблицы 
         * 
         */
        self.dropTrigger = function (aSchemaName, aTableName) {
            var dataOperation = model.ldelete_dropTrigger;
            var resultOperation = model.ldel_resultOperaition;
            var ret;
            self.getActionId(function (actId) {

                ret = {actionId: actId, actionResult: null};

                if (ret.actionId) {
                    
                    dataOperation.params.platypusUser = platypusUserName;
                    dataOperation.params.schemaName = aSchemaName;
                    dataOperation.params.tablename = aTableName;
                    dataOperation.params.actionId = ret.actionId;

                    dataOperation.execute(function(){
                        resultOperation.params.actionId = ret.actionId;
                        resultOperation.requery(function(){
                            if (resultOperation[0]) {
                                ret.actionResult = resultOperation[0].resultCode;
                            }
                            showResult(ret);
                        }, function(){
                            showResult(ret);
                        });
                    }, function(){
                       showResult(ret);
                    });
                } else {
                    showResult(ret);
                }
            });
        };


    
        /**
         * Вывести результат операции
         * 
         *
         * @param code {Объект : (число,число)} {actionId, actionResult}
         * 
         *     actionId-id операции в логе,
         *     actionResult-результат операции(
         *         0  - ошибок нет,
         *         >0 - количество ошибочных sql,
         *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
         *         (Select ldel_addcolumn(:platypusUser, :schemaName, :tablename, :actionId) AS actionResult 

         */
        function showResult(code) {
            if (code) {
                var define = '';
                if (code.actionResult === 0) {
                    define = ' (ошибок нет)';
                } else if (code.actionResult > 0) {
                    define = ' (кол-во ошибок)';
                } else if (code.actionResult === -1) {
                    define = ' (возможно неполное выполнение)';
                }
                alert("Код завершения:" + code.actionResult + define + "\nId операции:" + code.actionId, "Операция завершена");
            } else {
                alert("Результат неизвестен", "Операция завершена");
            }
        }
        
    };
    
});
