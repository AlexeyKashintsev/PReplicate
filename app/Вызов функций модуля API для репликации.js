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
            model.dsViews.requery();
            model.dsRemoveDefine.requery();
        }

        form.btnDropSchema.onActionPerformed = function (evt) {//p3p5
            if (!confirm("Данная операция не может быть отменена !!!\nПродолжить?", "Внимание !!!"))
                return;
            showResult(replicateModule.dropSchema(model.params.pSchema));
        };
        
        form.btnGenerateSchemaName.onActionPerformed = function(event) {
            replicateModule.generateSchemaName(function(aName) {
                form.txtCreateSchema.text = aName;
            });
        };


        form.btnCreateSchema.onActionPerformed = function (evt) {//p3p5
            replicateModule.createSchema(form.txtCreateSchema.text, showResult);
        };

        form.btnCreateView.onActionPerformed = function (evt) {//p3p5
            showResult(replicateModule.createView(model.params.pViewSchema, model.params.pView));
        };

        form.btnDropView.onActionPerformed = function (evt) {//p3p5
            showResult(replicateModule.dropView(model.params.pViewSchema, model.params.pView));
        };

        form.btnCreateSequence.onActionPerformed = function (evt) {//p3p5
            showResult(replicateModule.createSequence(model.params.pSequenceSchema, model.params.pSequence));
        };

        form.btnDropSequence.onActionPerformed = function (evt) {//p3p5
            showResult(replicateModule.dropSequence(model.params.pSequenceSchema, model.params.pSequence));
        };

        form.btnAddDefine.onActionPerformed = function (evt) {//p3p5
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
            showResult(replicateModule.removeViewDefine(model.params.pRemoveDefine, (form.chkRemoveAll.selected ? 1 : 0)));
            refreshDefineViews();
        };
        
        form.button.onActionPerformed = function(evt) {
            var tabs = ["adm_modules"
                       , "ag_agent_terminals"
                       , "tran_type"
                       , "tran_smena"
                       , "tran_stops"
                       , "tran_zones"
                       , "usr_groups"
                       , "usr_users_groups"
                       , "adm_mod_rules"
                       , "tran_company_routes"
                       , "usr_groups_rules"
                       , "ag_terminals"
                       , "bill_accounts"
                       , "bill_operations_status"
                       , "bill_cost"
                       , "tran_stops_routes"
                       , "bill_services_types"
                       , "bill_operations_type"
                       , "corp_company"
                       , "dummy_table"
                       , "corp_comp_tk"
                       , "disc_discounts"
                       , "mtd_groups"
                       , "bill_services"
                       , "disc_tktypes"
                       , "event_types"
                       , "misc_data_types"
                       , "em_emitent"
                       , "fl_person"
                       , "dummy"
                       , "fl_list_type"
                       , "mtk_labels"
                       , "term_aval_settings"
                       , "misc_hday_marks"
                       , "mtd_users"
                       , "proba"
                       , "term_crs"
                       , "term_sync_types"
                       , "term_settings"
                       , "test"
                       , "tran_dispatches"
                       , "tk_list"
                       , "tk_bill_services"
                       , "tk_stop_list"
                       , "tk_companies"
                       , "tk_fill_operations"
                       , "tk_routes"
                       , "tk_activity"
                       , "tran_disp_routes"
                       , "tran_company"
                       , "tran_jobs"
                       , "tran_persons"
                       , "tk_timetable_types"
                       , "tk_type_discounts"
                       , "tran_round"
                       , "tran_routes"
                       , "term_company"
                       , "mtk_shots"
                       , "disc_type"
                       , "tk_card"
                       , "bill_services_accounts"
                       , "ag_agents"
                       , "bill_operations"
                       , "bill_services_connect"
                       , "events"
                       , "disc_active"
                       , "disc_rules"
                       , "disc_services"
                       , "term_terminal"
                       , "usr_rules"
                       , "tran_routes_cost"
                       , "mtd_entities"
                       , "fl_cardholder"
                       , "comp_contragent"
                       , "term_sync_list"
                       , "tk_activity_route"
                       , "tk_timetable"
                       , "tk_type"
                       , "tk_trans"
                   ];
                   
            var typ = 0;
            if (form.rbAllRW.selected) {
                typ = 1;
            } else if (form.rbOwnerRW.selected) {
                typ = 2;
            }

           function ggg() {
               var tab = tabs.pop();
               if (tab)
                replicateModule.addViewDefine(tab, typ, (form.chkRecreateAll.selected ? 1 : 0), function (aRes) {
                     ggg();
                 });                       
           }

           ggg();
        };
    };
});
