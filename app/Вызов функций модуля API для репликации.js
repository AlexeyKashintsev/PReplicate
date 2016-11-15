/**
 * @author Work
 */
define('ReplicatesAPIView', ['orm', 'forms', 'ui', 'ReplicationAPI'], function (Orm, Forms, Ui, ReplicationAPI, ModuleName) {
    return function () {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        self.show = function () {
            form.show();
        };

        model.requery(function () {

        });

        var replicateModule = new ReplicationAPI();

        function showResult(code) {
            if (code) {
                alert("Код завершения:" + code.actionResult + "\nId операции:" + code.actionId, "Операция завершена");
            } else {
                alert("Результат неизвестен", "Операция завершена");
            }
        }

        function refreshDefineViews() {
            model.dsRemoveDefine.requery();
            model.dsViews.requery();
        }

        form.btnDropSchema.onActionPerformed = function (evt) {
            if (!confirm("Данная операция не может быть отменена !!!\nПродолжить?", "Внимание !!!"))
                return;
            replicateModule.dropSchema(form.comboDropSchema.value.context,showResult);
        };
        
        form.btnGenerateSchemaName.onActionPerformed = function(event) {
            replicateModule.generateSchemaName(function(aName) {
                form.txtCreateSchema.text = aName;
            });
        };


        form.btnCreateSchema.onActionPerformed = function (evt) {
            replicateModule.createSchema(form.txtCreateSchema.text, showResult);
        };

        form.btnCreateView.onActionPerformed = function (evt) {
            var p1 = (form.comboViewSchema.value ? form.comboViewSchema.value.context : '');
            var p2 = (form.comboView.value ? form.comboView.value.tablename : '');
            replicateModule.createView(p1,p2,showResult);
        };

        form.btnDropView.onActionPerformed = function (evt) {
            var p1 = (form.comboViewSchema.value ? form.comboViewSchema.value.context : '');
            var p2 = (form.comboView.value ? form.comboView.value.tablename : '');
            replicateModule.dropView(p1,p2,showResult);
        };

        form.btnCreateSequence.onActionPerformed = function (evt) {
            var p1 = (form.comboSequenceSchema.value ? form.comboSequenceSchema.value.context : '');
            var p2 = (form.comboSequence.value ? form.comboSequence.value.sequencename : '');
            replicateModule.createSequence(p1, p2,showResult);
        };

        form.btnDropSequence.onActionPerformed = function (evt) {
            var p1 = (form.comboSequenceSchema.value ? form.comboSequenceSchema.value.context : '');
            var p2 = (form.comboSequence.value ? form.comboSequence.value.sequencename : '');
            replicateModule.dropSequence(p1, p2,showResult);
        };

        form.btnAddDefine.onActionPerformed = function (evt) {
            var typ = 0;
            if (form.rbAllRW.selected) {
                typ = 1;
            } else if (form.rbOwnerRW.selected) {
                typ = 2;
            }
            ;
            replicateModule.addViewDefine(form.txtAddDefine.text, typ, (form.chkRecreateAll.selected ? 1 : 0), function (aRes) {
                showResult(aRes);
                refreshDefineViews();
            });
        };

        form.btnRemoveDefine.onActionPerformed = function (evt) {//p3p5
            replicateModule.removeViewDefine(form.comboRemoveDefine.value.tablename, (form.chkRemoveAll.selected ? 1 : 0), function (aRes) {
                showResult(aRes);
                refreshDefineViews();
            });
        };
        
    };
});
