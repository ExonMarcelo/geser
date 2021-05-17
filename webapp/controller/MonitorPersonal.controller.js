var oCtrl_MonPersonal;var oFragments={};sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,a,n,o){var l;return t.extend("com.exonmarcelo.geser.webapp.controller.MonitorPersonal",{onInit:function(t){oCtrl_MonPersonal=this;console.log("init");l=oCtrl_MonPersonal.getView();l.addEventDelegate({onBeforeShow:e.proxy(function(e){this.onBeforeShow(e)},this)});Utils.fnCreateFilterPanel("PERSONAL",oCtrl_MonPersonal)},onBeforeShow:function(e){oComponent.fnToggleButtonsTP(true);oComponent.fnToggleButtonUser(true);oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.11")},onAfterRendering:function(){},fnFilter:function(e){var t={title:"Filtros",conditionText:"Filtrar desde BD",conditionIsMandatory:true,content:[new sap.m.Label({text:"DNI"}),new sap.m.Input({value:"",maxLength:8}),new sap.m.Label({text:"Nombre"}),new sap.m.Input({value:"",maxLength:50}),new sap.m.Label({text:"Apellido"}),new sap.m.Input({value:"",maxLength:50})],filterButtonText:"Aplicar",cancelButtonText:"Cancelar",fnLocalFilter:function(){var e=[new n("dni",sap.ui.model.FilterOperator.Contains,t.content[1].getValue()),new n("name",sap.ui.model.FilterOperator.Contains,t.content[3].getValue()),new n("surname",sap.ui.model.FilterOperator.Contains,t.content[5].getValue())];var a=[];for(var o=0;o<e.length;o++){if(e[o].oValue1!=""){a.push(e[o])}}if(a.length>0){var l=new sap.ui.model.Filter(a);var r=oCtrl_MonPersonal.byId("idTableCustomers").getBinding("items");r.filter(l,false)}console.log("local filter")},fnDBFilter:function(){console.log("DB filter")},fnCancelFilter:function(){console.log("canceled filter")}};Utils.fnCreateDialogFilter(t)},fnCleanFilters:function(){Utils.fnCleanTableFilters(oCtrl_MonPersonal,"idTableCustomers")},onItemPress:function(e){var t=e.getParameter("listItem").getBindingContext("mCatalogs").sPath;var a=oCore.getModel("mCatalogs").getProperty(t);var n=oCore.getModel("mPersonalDetail");n.setData(a);n.refresh();var o=sap.ui.core.UIComponent.getRouterFor(oCtrl_MonPersonal);o._oConfig.transition="slide";o.navTo("PersonalDetail",{},false)},onSettingsTablePersonal:function(e){var t=oCore.getModel("mCatalogs");var a=[{key:"plate",text:oCore.getModel("i18n").getProperty("MonitorPersonal.Table.Column.2"),duplicate:false},{key:"brand",text:oCore.getModel("i18n").getProperty("MonitorPersonal.Table.Column.3"),duplicate:true},{key:"cylinder",text:oCore.getModel("i18n").getProperty("MonitorPersonal.Table.Column.4"),duplicate:true}];var o=[],l=[];for(var r=0;r<a.length;r++){if(!a[r].duplicate){var i=new sap.m.ViewSettingsItem({text:"{mCatalogs>"+a[r].key+"}",key:"{mCatalogs>"+a[r].key+"}"});var s=new sap.m.ViewSettingsFilterItem({text:a[r].text,key:a[r].key,multiSelect:false});s.setModel(t,"mCatalogs");s.bindAggregation("items","mCatalogs>/CUSTOMERS",i);o.push(s)}else{var m=oCore.getModel("mCatalogs").getData().CUSTOMERS;var g=Utils.fnDeleteDupilcateObjects(m,a[r].key);var d=oCore.getModel("mLocalFilters");switch(a[r].key){case"brand":d.getData().BRANDS=g;break;case"cylinder":d.getData().CYLINDERS=g;break}d.refresh();var u=new sap.m.ViewSettingsItem({text:"{mLocalFilters>"+a[r].key+"}",key:"{mLocalFilters>"+a[r].key+"}"});var p=new sap.m.ViewSettingsFilterItem({text:a[r].text,key:a[r].key,multiSelect:false});p.setModel(d,"mLocalFilters");var c="";switch(a[r].key){case"brand":c="mLocalFilters>/BRANDS";break;case"cylinder":c="mLocalFilters>/CYLINDERS";break}p.bindAggregation("items",c,u);o.push(p)}l.push(new sap.m.ViewSettingsItem({text:a[r].text,key:a[r].key}))}if(l.length>0){l[0].setSelected(true)}var f=new sap.m.ViewSettingsDialog({title:Utils.fnReadTranslate("Button.SettingsTable.Text"),filterSearchOperator:"Contains",confirm:function(e){var t=oCtrl_MonPersonal.byId("idTableCustomers"),a=e.getParameters(),o=t.getBinding("items"),l,r,i=[],s=[];l=a.sortItem.getKey();r=a.sortDescending;i.push(new sap.ui.model.Sorter(l,r));o.sort(i);a.filterItems.forEach(function(e){var t=e.getKey(),a=e.getParent().getKey(),o=new n(a,"EQ",t);s.push(o)});o.filter(s);oCtrl_MonPersonal.byId("idCounterPersonal").setText("("+o.aIndices.length+")")},sortItems:l,filterItems:o});f.open()},onNewPersonal:function(e){Utils.fnDialogNewPersonal()},onSelectCustomer:function(e){var t=oCore.getModel("mCatalogs");var a=new sap.m.StandardListItem({title:"{mCatalogs>dni}",description:"{mCatalogs>fullname}"});var o=new sap.m.SelectDialog({noDataText:"{i18n>SelectDialog.noDataText}",title:"{i18n>MonitorPersonal.SelectDialog.Title}",confirm:function(e){var t=e.getParameter("selectedItem");if(t){oCtrl_MonPersonal.onNewPersonal()}if(!t){}},search:function(e){var t=e.getParameter("value");var a=new n("fullname",sap.ui.model.FilterOperator.Contains,t);var o=new n("dni",sap.ui.model.FilterOperator.Contains,t);var l=new sap.ui.model.Filter([a,o]);var r=e.getSource().getBinding("items");r.filter(l,false)}});o.setModel(t,"mCatalogs");o.bindAggregation("items","mCatalogs>/CUSTOMERS",a);o.open()},onNewEmployee:function(e){oComponent.fnCleanModel("mPersonalDetail");var t=sap.ui.Device.system.desktop?"sapUiSizeCompact":"sapUiSmallMarginBottom";var a={title:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Title"),icon:"sap-icon://add-employee",content:[new sap.m.Label({text:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Label.1.Text")}),new sap.m.Input({value:"{mPersonalDetail>/name}"}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Label.2.Text")}),new sap.m.Input({value:"{mPersonalDetail>/surname}"}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Label.3.Text")}),new sap.m.Input({value:"{mPersonalDetail>/dni}"}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Label.4.Text")}),new sap.m.DatePicker({value:"{mPersonalDetail>/birthdate}",valueFormat:"dd/MM/yyyy",displayFormat:"dd/MM/yyyy",change:function(){}}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Label.5.Text")}),new sap.m.Input({value:"{mPersonalDetail>/phone}"}).addStyleClass(t),new sap.m.Label({text:Utils.fnReadTranslate("MonitorPersonal.DialogNewEmployee.Label.6.Text")}),new sap.m.Input({value:"{mPersonalDetail>/email}"}).addStyleClass(t)],textButtonOK:Utils.fnReadTranslate("Button.Save"),fnButtonOK:function(){var e={sIcon:"SUCCESS",sMessage:"Empleado agregado con éxito.",fnButtonOK:function(){var e=sap.ui.core.UIComponent.getRouterFor(oCtrl_MonPersonal);e._oConfig.transition="slide";e.navTo("PersonalDetail",{},false)}};Utils.fnShowMessage(e)},textButtonCancel:Utils.fnReadTranslate("Button.Cancel"),fnButtonCancel:undefined,sClassDialog:t};Utils.fnDialogWithSimpleForm(a)}})});