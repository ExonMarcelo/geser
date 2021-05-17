var oCtrl_MonMonitoringServices;var oFragments={};sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,n,r){var a;return t.extend("com.exonmarcelo.geser.webapp.controller.MonitorMonitoringServices",{onInit:function(t){oCtrl_MonMonitoringServices=this;console.log("init");a=oCtrl_MonMonitoringServices.getView();a.addEventDelegate({onBeforeShow:e.proxy(function(e){this.onBeforeShow(e)},this)});Utils.fnCreateFilterPanel("MONITORING_SERVICES",oCtrl_MonMonitoringServices)},onBeforeShow:function(e){oComponent.fnToggleButtonsTP(true);oComponent.fnToggleButtonUser(true);oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.8")},onAfterRendering:function(){},fnFilter:function(e){var t={title:"Filtros",conditionText:"Filtrar desde BD",conditionIsMandatory:true,content:[new sap.m.Label({text:"DNI"}),new sap.m.Input({value:"",maxLength:8}),new sap.m.Label({text:"Nombre"}),new sap.m.Input({value:"",maxLength:50}),new sap.m.Label({text:"Apellido"}),new sap.m.Input({value:"",maxLength:50})],filterButtonText:"Aplicar",cancelButtonText:"Cancelar",fnLocalFilter:function(){var e=[new n("dni",sap.ui.model.FilterOperator.Contains,t.content[1].getValue()),new n("name",sap.ui.model.FilterOperator.Contains,t.content[3].getValue()),new n("surname",sap.ui.model.FilterOperator.Contains,t.content[5].getValue())];var o=[];for(var r=0;r<e.length;r++){if(e[r].oValue1!=""){o.push(e[r])}}if(o.length>0){var a=new sap.ui.model.Filter(o);var i=oCtrl_MonMonitoringServices.byId("idTableCustomers").getBinding("items");i.filter(a,false)}console.log("local filter")},fnDBFilter:function(){console.log("DB filter")},fnCancelFilter:function(){console.log("canceled filter")}};Utils.fnCreateDialogFilter(t)},fnCleanFilters:function(){Utils.fnCleanTableFilters(oCtrl_MonMonitoringServices,"idTableCustomers")},onItemPress:function(e){var t=e.getParameter("listItem").getBindingContext("mCatalogs").sPath;var o=oCore.getModel("mCatalogs").getProperty(t);var n=oCore.getModel("mCustomerDetail");n.setData(o);n.refresh();var r=sap.ui.core.UIComponent.getRouterFor(oCtrl_MonMonitoringServices);r._oConfig.transition="slide";r.navTo("CustomerDetail",{},false)},onSettingsTableCustomers:function(e){var t=oCore.getModel("mCatalogs");var o=[{key:"dni",text:oCore.getModel("i18n").getProperty("MonitorCustomers.Table.Column.1"),duplicate:false},{key:"name",text:oCore.getModel("i18n").getProperty("MonitorCustomers.Table.Column.2"),duplicate:true},{key:"surname",text:oCore.getModel("i18n").getProperty("MonitorCustomers.Table.Column.3"),duplicate:true}];var r=[],a=[];for(var i=0;i<o.length;i++){if(!o[i].duplicate){var l=new sap.m.ViewSettingsItem({text:"{mCatalogs>"+o[i].key+"}",key:"{mCatalogs>"+o[i].key+"}"});var s=new sap.m.ViewSettingsFilterItem({text:o[i].text,key:o[i].key,multiSelect:false});s.setModel(t,"mCatalogs");s.bindAggregation("items","mCatalogs>/CUSTOMERS",l);r.push(s)}else{var g=oCore.getModel("mCatalogs").getData().CUSTOMERS;var m=Utils.fnDeleteDupilcateObjects(g,o[i].key);var u=oCore.getModel("mLocalFilters");switch(o[i].key){case"name":u.getData().NAMES=m;break;case"surname":u.getData().SURNAMES=m;break}u.refresh();var c=new sap.m.ViewSettingsItem({text:"{mLocalFilters>"+o[i].key+"}",key:"{mLocalFilters>"+o[i].key+"}"});var C=new sap.m.ViewSettingsFilterItem({text:o[i].text,key:o[i].key,multiSelect:false});C.setModel(u,"mLocalFilters");var p="";switch(o[i].key){case"name":p="mLocalFilters>/NAMES";break;case"surname":p="mLocalFilters>/SURNAMES";break}C.bindAggregation("items",p,c);r.push(C)}a.push(new sap.m.ViewSettingsItem({text:o[i].text,key:o[i].key}))}if(a.length>0){a[0].setSelected(true)}var f=new sap.m.ViewSettingsDialog({title:Utils.fnReadTranslate("Button.SettingsTable.Text"),filterSearchOperator:"Contains",confirm:function(e){var t=oCtrl_MonMonitoringServices.byId("idTableCustomers"),o=e.getParameters(),r=t.getBinding("items"),a,i,l=[],s=[];a=o.sortItem.getKey();i=o.sortDescending;l.push(new sap.ui.model.Sorter(a,i));r.sort(l);o.filterItems.forEach(function(e){var t=e.getKey(),o=e.getParent().getKey(),r=new n(o,"EQ",t);s.push(r)});r.filter(s);oCtrl_MonMonitoringServices.byId("idCounterCustomers").setText("("+r.aIndices.length+")")},sortItems:a,filterItems:r});f.open()}})});