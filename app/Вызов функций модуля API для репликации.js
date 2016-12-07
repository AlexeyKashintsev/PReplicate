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
            replicateModule.removeViewDefine(form.comboRemoveDefine.jsValue.tablename, (form.chkRemoveAll.selected ? 1 : 0), function (aRes) {
                showResult(aRes);
                refreshDefineViews();
            });
        };
        
        form.button.onActionPerformed = function() {
            var tabs = ["mtd_rules"
                , "comp_contragent"
                , "em_emitent"
                , "term_company"
                , "tran_persons"
                , "tk_card"
                , "fl_person"
                , "tran_smena"
                , "mtd_users"
                , "mtk_shots"
                , "tran_company"
                ];
                
//            var tabs = ["bill_operations_status"
//            , "events"
//            , "bill_operations"
//            , "tran_jobs"
//            , "replicate_sequences"
//            , "disc_active"
//            , "ag_agents"
//            , "disc_services"
//            , "tk_bill_services"
//            , "ag_agent_terminals"
//            , "dummy_table"
//            , "tran_type"
//            , "replicate_actions_sqls"
//            , "tran_dispatches"
//            , "corp_company"
//            , "corp_comp_tk"
//            , "soc_fl"
//            , "disc_type"
//            , "bill_services"
//            , "fl_cardholder"
//            , "bill_cost"
//            , "term_terminal"
//            , "tk_timetable_types"
//            , "edu_fl"
//            , "term_settings"
//            , "adm_mod_rules"
//            , "disc_tktypes"
//            , "all_rules"
//            , "tran_round_crs"
//            , "adm_modules"
//            , "replicate_actions"
//            , "tk_fill_operations"
//            , "disc_discounts"
//            , "mtd_entities"
//            , "tk_type"
//            , "term_aval_settings"
//            , "tk_stop_list"
//            , "mtd_groups"
//            , "term_sync_list"
//            , "usr_groups_rules"
//            , "bill_balance"
//            , "replicate_views"
//            , "adm_import_sources"
//            , "mtk_labels"
//            , "tk_payment"
//            , "tk_activity_route"
//            , "tk_companies"
//            , "misc_hday_marks"
//            , "usr_rules"
//            , "bill_services_connect"
//            , "term_sync_types"
//            , "tran_stops_routes"
//            , "usr_groups"
//            , "tran_routes"
//            , "misc_data_types"
//            , "tk_activity"
//            , "tran_company_routes"
//            , "dummytable"
//            , "bill_accounts"
//            , "edu_schools"
//            , "tk_timetable"
//            , "tk_type_discounts"
//            , "tran_round"
//            , "bill_services_accounts"
//            , "dummy"
//            , "tk_trans"
//            , "bill_operations_type"
//            , "tran_crs_offences"
//            , "disc_rules"
//            , "tran_stops"
//            , "ag_terminals"
//            , "term_encrypt_keys"
//            , "bill_services_types"
//            , "tran_disp_routes"
//            , "tran_routes_cost"
//            , "tk_routes"
//            , "tran_zones"
//            , "usr_users_groups"
//            , "event_types"
//            , "soc_types"
//            , "fl_list_type"
//            ];
            
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
