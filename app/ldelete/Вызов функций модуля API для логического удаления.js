/**
 * 
 * @author vy
 */
define('LDeleteAPIView', ['orm', 'forms', 'ui', 'ReplicationAPI', 'LDeleteAPI'], function (Orm, Forms, Ui, ReplicationAPI, LDeleteAPI, ModuleName) {
    function module_constructor() {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);
        
        self.show = function () {
            form.show();
        };
        
        var ldeleteModule = new LDeleteAPI();
        
        
        model.requery(function () {
            
            if (model.ldelete_getCurrentSchema[0]) {
                form.txtSchema.text = model.ldelete_getCurrentSchema[0].schemaName;
            }
        });
        
        form.btnAddColumn.onActionPerformed = function (evt) {
            ldeleteModule.addColumn(form.txtSchema.text,form.txtTable.text);
        };

        form.btnCreateFunction.onActionPerformed = function (evt) {
            ldeleteModule.createFunction(form.txtSchema.text,form.txtTable.text);
        };
        form.btnCreateTrigger.onActionPerformed = function (evt) {
            ldeleteModule.createTrigger(form.txtSchema.text,form.txtTable.text);
        };
        form.btnDropFunction.onActionPerformed = function (evt) {
            ldeleteModule.dropFunction(form.txtSchema.text,form.txtTable.text);
        };
        form.btnDropTrigger.onActionPerformed = function (evt) {
            ldeleteModule.dropTrigger(form.txtSchema.text,form.txtTable.text);
        };
        
        form.btnSave.onActionPerformed = function (evt) {
            model.save();
        };
        
    }
    return module_constructor;
});


