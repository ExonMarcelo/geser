var oCtrl_Main;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox", 
  "sap/m/ActionSheet",
  "sap/m/Button"], 
  function(Controller, MessageBox, ActionSheet, Button) {
  "use strict";

  return Controller.extend("com.exonmarcelo.geser.webapp.controller.Main", {
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf com.exonmarcelo.geser.webapp.view.Content2
     */
    onInit: function() {
      oCtrl_Main = this;

      var oView = this.getView();

      var oModel = oCore.getModel("mUser");
      oModel.setData({
        user : "EMARCELO",
        name: "Exon",
        surname: "Marcelo Juarez",
        full_name:"Exon Marcelo Juarez",
        role : "Mecánico",
        last_session : "21/03/2019 00:24"
      });
      oModel.refresh();

      //filterPanel of Monitor Appointments
      Utils.fnCreateFilterPanel("MONITOR_REQUESTS", oCtrl_Main, "itfMonitorRequests")

      oView.addEventDelegate({
				// not added the controller as delegate to avoid controller functions with similar names as the events
				onBeforeShow : jQuery.proxy(function(oEvt) {
					this.onBeforeShow(oEvt);
				}, this),
				/*onAfterShow : jQuery.proxy(function(oEvt) {
					this.onAfterShow(oEvt);
				}, this),
				onAfterHide : jQuery.proxy(function(oEvt) {
					this.onAfterHide(oEvt);
				}, this)*/
			});
    },

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf com.exonmarcelo.geser.webapp.view.Content2
     */
    onBeforeShow: function() {
      oComponent.fnToggleButtonsTP(false);
      oComponent.fnToggleButtonUser(true);
      oComponent.fnChangeTitleApp("ToolPage.Header.ToolHeader.Title.1");

      oCtrl_Main.fn_setDataToAppointments();
    },

    fn_setDataToAppointments: function() {
      var aData = [
        {
          Appointments: [
            {
              start: new Date("03/14/2019 09:00"),
              end: new Date("03/14/2019 11:00"),
              title: "Mantenimiento",
              type: "Type02",
              tentative: false,
              time: "1 Hora"
            },
            {
              start: new Date("03/14/2019 09:00"),
              end: new Date("03/14/2019 11:00"),
              title: "Cambio de Retenes de Volante",
              type: "Type02",
              tentative: false,
              time: "2 Horas"
            },
            {
              start: new Date("03/14/2019 10:00"),
              end: new Date("03/14/2019 12:00"),
              title: "Cambio de Discos de Embrague",
              type: "Type03",
              tentative: false,
              time: "2 Horas"
            },
            {
              start: new Date("03/14/2019 11:00"),
              end: new Date("03/14/2019 16:00"),
              title: "Cambio de Anillos",
              type: "Type02",
              tentative: false,
              time: "5 Horas"
            }
          ]
        }
      ];

      oCore.getModel("mMain").getData().PlanningCalendar = aData;
      oCore.getModel("mMain").refresh();
      //mMain
    },

    handleAppointmentSelect: function(oEvt) {
		//get selected item of the list
		var sPath = oEvt.getParameter("appointment").getBindingContext("mMonitor").getPath();
		var oRegAppointment = oCore.getModel("mMonitor").getProperty(sPath);
		//bind record to model mAppointmentDetail
		var oModel = oCore.getModel("mAppointmentDetail");
		oModel.setData(oRegAppointment);
		oModel.refresh();

      var oDialog = new sap.m.Dialog({
        stretch: sap.ui.Device.system.phone ? true : false,
        title: "{i18n>Main.ServiceAppointments.Dialog.Title}",
        content: [
			new sap.ui.layout.form.SimpleForm({
				//adjustLabelSpan:false,
				editable: true,
				layout: "ResponsiveGridLayout",
				labelSpanXL: 3,
				labelSpanL: 3,
				labelSpanM: 3,
				labelSpanS: 12,
				adjustLabelSpan: false,
				emptySpanXL: 4,
				emptySpanL: 4,
				emptySpanM: 4,
				emptySpanS: 0,
				columnsXL: 1,
				columnsL: 1,
				columnsM: 1,
				singleContainerFullSize: false,
				content: [
				  new sap.m.Label({ design: "Bold", text: "{i18n>Main.ServiceAppointments.Dialog.Form.Label.1.Text}" }),
				  new sap.m.Text({ text: "{mAppointmentDetail>/title}" }),
				  new sap.m.Label({ design: "Bold", text: "{i18n>Main.ServiceAppointments.Dialog.Form.Label.2.Text}" }),
				  new sap.m.Text({ text: "{mAppointmentDetail>/time}" }),
				  new sap.m.Label({ design: "Bold", text: "{i18n>Main.ServiceAppointments.Dialog.Form.Label.3.Text}" }),
				  new sap.m.Text({ text: sDateFormat_1.format(oModel.getProperty("/start"))}),
				  new sap.m.Label({ design: "Bold", text: "{i18n>Main.ServiceAppointments.Dialog.Form.Label.4.Text}" }),
				  new sap.m.Text({ text: sDateFormat_1.format(oModel.getProperty("/end")) })
				]
			  }),
			  new sap.m.Bar({
				contentRight:[
					new sap.m.MenuButton({
						text: "{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.Text}",
						menu:[
							new sap.m.Menu({
								items:[
									new sap.m.MenuItem({text:"{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.MenuItem.1.Text}", icon:"sap-icon://edit"}),
									new sap.m.MenuItem({text:"{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.MenuItem.2.Text}", icon:"sap-icon://inspect-down"}),
									new sap.m.MenuItem({text:"{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.MenuItem.3.Text}", icon:"sap-icon://repost"}),
								],
								itemSelected: function() {
									oDialog.close();
								  }
							})
						]
						
						
					  }),
					new sap.m.Button({
						text: "{i18n>Main.ServiceAppointments.Dialog.Bar.Button.Text}",
						press: function() {
						  oDialog.close();
						}
					  })
				]
			  })
		]
        
      });

      oDialog.open();
    },

    handlePressMonServ: function(oEvt) {
      //get selected item of the list
      var sPath = oEvt.getParameter("listItem").getBindingContext("mMain").getPath();
      var oRegMonitoring = oCore.getModel("mMain").getProperty(sPath);
      //bind record to model mMonitoringDetail
      var oModel = oCore.getModel("mMonitoringDetail");
      oModel.setData(oRegMonitoring);
      oModel.refresh();
      //create table
      var oTable = new sap.m.Table({
        inset: false,
        /*headerToolbar: new sap.m.Toolbar({
					content:[
						new sap.m.Title({
							text:"Historial de Etapas de Servicio"
						}) 
					]
				}),*/
        columns: [
          new sap.m.Column({
            header: new sap.m.Title({ text: "{i18n>Main.MonitoringServices.Dialog.Panel.Table.Column.1.Text}" })
          }),
          new sap.m.Column({
            header: new sap.m.Title({ text: "{i18n>Main.MonitoringServices.Dialog.Panel.Table.Column.2.Text}" })
          }),
          new sap.m.Column({
            minScreenWidth: "Desktop",
            demandPopin: true,
            header: new sap.m.Title({ text: "{i18n>Main.MonitoringServices.Dialog.Panel.Table.Column.3.Text}" })
          })
        ]
      });

      var oTemplate = new sap.m.ColumnListItem({
        cells: [
          new sap.m.Text({ text: "{mMonitoringDetail>status_description}" }),
          new sap.m.Text({ text: "{mMonitoringDetail>date}" }),
          new sap.m.Text({ text: "{mMonitoringDetail>observation}" })
        ]
      });

      oTable.setModel(oModel, "mMonitoringDetail");
      oTable.bindAggregation(
        "items",
        "mMonitoringDetail>/history_stages",
        oTemplate
      );
      //create dialog
      var oDialog = new sap.m.Dialog({
        stretch: sap.ui.Device.system.phone ? true : false,
        //verticalScrolling: true,
        title: "{i18n>Main.MonitoringServices.Dialog.Title}",
        content: [
          new sap.m.VBox({
            alignItems: "Center",
            items: [
              new sap.f.Avatar({
                src: "{mMonitoringDetail>/img_vehicle}",
                displaySize: "M",
                displayShape: "Circle"
              }),

              new sap.m.Title({ text: "{mMonitoringDetail>/license_plate}" }),
              new sap.m.Title({
                text: "{mMonitoringDetail>/service_description}"
              })
            ]
          }),
          new sap.ui.layout.form.SimpleForm({
            //adjustLabelSpan:false,
            editable: true,
            layout: "ResponsiveGridLayout",
            labelSpanXL: 3,
            labelSpanL: 3,
            labelSpanM: 3,
            labelSpanS: 12,
            adjustLabelSpan: false,
            emptySpanXL: 4,
            emptySpanL: 4,
            emptySpanM: 4,
            emptySpanS: 0,
            columnsXL: 1,
            columnsL: 1,
            columnsM: 1,
            singleContainerFullSize: false,
            content: [
              new sap.m.Label({ design: "Bold", text: "{i18n>Main.MonitoringServices.Dialog.Form.Label.1.Text}" }),
              new sap.m.Text({ text: "{mMonitoringDetail>/owner}" }),
              new sap.m.Label({ design: "Bold", text: "{i18n>Main.MonitoringServices.Dialog.Form.Label.2.Text}" }),
              new sap.m.Text({ text: "{mMonitoringDetail>/start_date}" }),
              new sap.m.Label({ design: "Bold", text: "{i18n>Main.MonitoringServices.Dialog.Form.Label.3.Text}" }),
              new sap.m.Text({ text: "{mMonitoringDetail>/end_date}" })
            ]
          }),
          new sap.m.Panel({
            headerText: "{i18n>Main.MonitoringServices.Dialog.Panel.HeaderText}",
            expandable: true,
            expanded: false,
            content: [oTable]
          })
        ],
        beginButton: new sap.m.Button({
          text: "{i18n>Main.MonitoringServices.Dialog.Button.1.Text}",
          press: function() {
            oCtrl_Main.byId("listMonitoringServices").removeSelections();
            oDialog.close();
            oDialog.destroy();
          }
        })
      });

      oDialog.open();
    },

    onSelectTile: function(oEvt) {
      var sTile = oEvt.getSource().getId().split("--")[1];
      switch (sTile) {
        case 'stCatalogs':
          oCtrl_Main.getOwnerComponent().getRouter().navTo("Catalogs");
          break;
      
        default:
          break;
      }
    },

    /*********************************************************** 
     *            FUNCTIONS FOR APPOINTMENTS                   *
		 * reused in main and monitorAppointments									 *
     * ********************************************************/
    handleAppointmentSelect: function(oEvt) {
			//parameter selected Item of the table or appointment of the planningCalendar
			var oParamenter = (oEvt.getParameter("listItem") != undefined)? oEvt.getParameter("listItem") : oEvt.getParameter("appointment");

			//get selected item of the list
			var sPath = oParamenter.getBindingContext("mMonitor").getPath();
			var oRegAppointment = oCore.getModel("mMonitor").getProperty(sPath);
			//bind record to model mAppointmentDetail
			var oModel = oCore.getModel("mAppointmentDetail");
			oModel.setData(oRegAppointment);
			oModel.refresh();
	
		  var oDialog = new sap.m.Dialog({
			stretch: sap.ui.Device.system.phone ? true : false,
			title: "{i18n>Main.ServiceAppointments.Dialog.Title}",
			content: [
				new sap.ui.layout.form.SimpleForm({
					//adjustLabelSpan:false,
					editable: true,
					layout: "ResponsiveGridLayout",
					labelSpanXL: 3,
					labelSpanL: 3,
					labelSpanM: 3,
					labelSpanS: 12,
					adjustLabelSpan: false,
					emptySpanXL: 4,
					emptySpanL: 4,
					emptySpanM: 4,
					emptySpanS: 0,
					columnsXL: 1,
					columnsL: 1,
					columnsM: 1,
					singleContainerFullSize: false,
					content: [
						new sap.m.Label({ design: "Bold", text: Utils.fnReadTranslate("MonitorAppointments.DialogDetail.Label.1.Text") }),
						new sap.m.Text({ text: "{mAppointmentDetail>/nro_appointment}" }),
						new sap.m.Label({ design: "Bold", text: Utils.fnReadTranslate("MonitorAppointments.DialogDetail.Label.2.Text") }),
						new sap.m.Text({ text: "{mAppointmentDetail>/plate}" }),
						new sap.m.Label({ design: "Bold", text: Utils.fnReadTranslate("MonitorAppointments.DialogDetail.Label.3.Text") }),
					  new sap.m.Text({ text: util.Formatter.listServicesInColumn(oRegAppointment.services) }),
						new sap.m.Label({ design: "Bold", text: Utils.fnReadTranslate("MonitorAppointments.DialogDetail.Label.4.Text") }),
						new sap.m.Text({ text: "{mAppointmentDetail>/start}"}),
						new sap.m.Label({ design: "Bold", text: Utils.fnReadTranslate("MonitorAppointments.DialogDetail.Label.5.Text") }),
						new sap.m.Text({ text: "{mAppointmentDetail>/time}" }),
						new sap.m.Label({ design: "Bold", text: Utils.fnReadTranslate("MonitorAppointments.DialogDetail.Label.6.Text") }),
						new sap.m.Text({ text: "{mAppointmentDetail>/status}" })
					]
				})
			],
			buttons:[
				new Button({
					text: "{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.Text}",
					press: function() {
					  //oDialog.close();
						var oActionSheet = new ActionSheet({
							title:Utils.fnReadTranslate("Message.SelectOption"),
							showCancelButton:true,
							placement:"VerticalPreferredTop",
							buttons:[
								new Button({text:"{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.MenuItem.1.Text}", icon:"sap-icon://edit", press: oCtrl_Main.onPressEditAppointment}),
								new Button({text:"{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.MenuItem.3.Text}", icon:"sap-icon://repost", press: oCtrl_Main.onPressPostponeAppointment}),
								new Button({text:"{i18n>Main.ServiceAppointments.Dialog.Bar.MenuButton.MenuItem.2.Text}", icon:"sap-icon://inspect-down", press: oCtrl_Main.onPressCancelAppointment})
							]
						});

						oActionSheet.openBy(this);
					}
				}),
				new sap.m.Button({
					text: "{i18n>Main.ServiceAppointments.Dialog.Bar.Button.Text}",
					press: function() {
					  oDialog.close();
					}
				})
			]
			
		  });
	
		  oDialog.open();
		},

		onPressEditAppointment: function(oEvt){
			//alert("EditAppointment")

			oComponent.fnCleanModel("mCustomerDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("MonitorAppointments.Message.Popup.Edit"),
				icon: "sap-icon://accelerated",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogEdit.Label.1.Text")}),
					new sap.m.Text({text: "{mAppointmentDetail>plate}"}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogEdit.Label.2.Text")}),
					new sap.m.MultiInput({
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_Main.onValueHelpServices
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogEdit.Label.3.Text")}),
					new sap.m.DateTimePicker({
						value:"",
						valueFormat:"dd/MM/yyyy HH:mm",
						displayFormat:"dd/MM/yyyy HH:mm",
						change:function(){}
					}).addStyleClass(sClass)

				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					/*oSettings = {
						text: "Cliente grabado con éxito",
						icon: "success",
						buttonText: "Aceptar",
						callback: function(){
							var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Main);
							router._oConfig.transition = "slide";
							router.navTo("CustomerDetail",{},false);
							console.log("refresh data");
						}
					};
					Utils.fnShowMessage(oSettings);*/
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		},

		onPressCancelAppointment: function(oEvt){
			Utils.fnShowConfirmationMessage({
				sMessage: Utils.fnReadTranslate("MonitorAppointments.Alert.CancelAppointment.Message"),
				fnButtonOK: function() {
					Utils.fnShowMessage({ sIcon: "SUCCESS", sMessage: Utils.fnReadTranslate("MonitorAppointments.Alert.CancelAppointment.Message.Success") })
				}
			});
		},

		onPressPostponeAppointment: function(oEvt){
			Utils.fnShowConfirmationMessage({
				sMessage: Utils.fnReadTranslate("MonitorAppointments.Alert.PostponeAppointment.Message"),
				fnButtonOK: oCtrl_Main.fnDialogPostponeAppointment
			});
		},

		fnDialogPostponeAppointment: function(){
			oComponent.fnCleanModel("mCustomerDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("MonitorAppointments.Message.Popup.Postpone"),
				icon: "sap-icon://accelerated",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogPostpone.Label.1.Text")}),
					new sap.m.Text({text: "{mAppointmentDetail>plate}"}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogPostpone.Label.2.Text")}),
					new sap.m.Text({text: util.Formatter.listServicesInColumn([])}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogPostpone.Label.3.Text")}),
					new sap.m.DateTimePicker({
						value:"",
						valueFormat:"dd/MM/yyyy HH:mm",
						displayFormat:"dd/MM/yyyy HH:mm",
						change:function(){}
					}).addStyleClass(sClass)

				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					Utils.fnShowMessage({ sIcon: "SUCCESS", sMessage: Utils.fnReadTranslate("MonitorAppointments.Alert.PostponeAppointment.Message.Success") })
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		},

		fnNewAppointment:function(){

			oComponent.fnCleanModel("mCustomerDetail");
			var sClass = (sap.ui.Device.system.desktop)?"sapUiSizeCompact":"sapUiSmallMarginBottom";

			var oSettingsForm = {
				title: Utils.fnReadTranslate("MonitorAppointments.Message.Popup.New"),
				icon: "sap-icon://accelerated",
				content:[
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogNew.Label.1.Text")}),
					new sap.m.Input({
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_Main.onSelectVehicle
					}).addStyleClass(sClass),
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogNew.Label.2.Text")}),
					new sap.m.MultiInput({
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: oCtrl_Main.onValueHelpServices
					}).addStyleClass(sClass),
					/*new sap.m.Input({
						showValueHelp: true,
						valueHelpOnly: true,
						valueHelpRequest: function(oEvt){
							alert("")
						}
					}).addStyleClass(sClass),*/
					new sap.m.Label({text: Utils.fnReadTranslate("MonitorAppointments.DialogNew.Label.3.Text")}),
					new sap.m.DateTimePicker({
						value:"",
						valueFormat:"dd/MM/yyyy HH:mm",
						displayFormat:"dd/MM/yyyy HH:mm",
						change:function(){}
					}).addStyleClass(sClass)

				],
				textButtonOK: Utils.fnReadTranslate("Button.Save"),
				fnButtonOK: function(){
					/*oSettings = {
						text: "Cliente grabado con éxito",
						icon: "success",
						buttonText: "Aceptar",
						callback: function(){
							var router = sap.ui.core.UIComponent.getRouterFor(oCtrl_Main);
							router._oConfig.transition = "slide";
							router.navTo("CustomerDetail",{},false);
							console.log("refresh data");
						}
					};
					Utils.fnShowMessage(oSettings);*/
				},
				textButtonCancel: Utils.fnReadTranslate("Button.Cancel"),
				fnButtonCancel: undefined,
				sClassDialog: sClass
			};

			Utils.fnDialogWithSimpleForm(oSettingsForm);
		},

		onSelectVehicle: function(oEvt){
            var oModel = oCore.getModel("mCatalogs");
            var oInput = oEvt.getSource();
            
            var oList= new sap.m.StandardListItem({	
              title:"{mCatalogs>plate}",
							description:"{mCatalogs>owner}",
							icon:"{mCatalogs>image}"
            });
            
            var oSelectDialog=new sap.m.SelectDialog({
                noDataText:"{i18n>SelectDialog.noDataText}",	
                title:"{i18n>MonitorAppointments.SelectDialog.Vehicle.Title}",
                    confirm:function(oEvt)
                    {
                        var oSelectedItem = oEvt.getParameter("selectedItem")

                        if (oSelectedItem) {
                            
                            //alert("Enviar al servicio: "+oSelectedItem.getTitle());
                            var sPath = oEvt.getParameter("selectedItem").getBindingContext("mCatalogs").getPath();
                            //oCtrl_DetalleEmpresa.onNuevoAsociado(sPath);
														var oRegister = oCore.getModel("mCatalogs").getProperty(sPath);
														oInput.setValue(oRegister.plate);
                            //oCtrl_MonVehicles.onNewVehicle();
                            //invocar al servicio
                            /*var oData = {
                                "id_idioma": oCore.User.Language.toUpperCase(),
                                "id_tipo_usuario":oSelectedItem.getTitle(),
                                "id_usuario":0
                            }
                            oCtrl_Datos_Maestros.oServ_Permisos(oData);*/
                        }
                        if (!oSelectedItem) {
                            oInput.resetProperty("");
                        }
                    },
                    search:function(oEvt)
                    {
                        var sValue = oEvt.getParameter("value");
                        var oFilterOwner = new Filter("owner", sap.ui.model.FilterOperator.Contains, sValue);
                        var oFilterPlate = new Filter("plate", sap.ui.model.FilterOperator.Contains, sValue);
                        var oModelFilter = new sap.ui.model.Filter([oFilterOwner, oFilterPlate]);
                        var oBinding = oEvt.getSource().getBinding("items");
                        oBinding.filter(oModelFilter, false);
                    }
            });
            
            oSelectDialog.setModel(oModel,"mCatalogs");
            oSelectDialog.bindAggregation("items","mCatalogs>/VEHICLES",oList);
            
            oSelectDialog.open();
            /*function openDialog(){
                oSelectDialog.open();
            };
            oCtrl_DetalleEmpresa.oServ_PersonasParaAsociar(openDialog);
            */
		},
		
		onValueHelpServices: function(oEvt) {
			var that = this;
  			var sMultiInput = oEvt.getSource();
  			
  			//sMultiInput.destroyTokens();
  			
  			var aServices = [];
  			
  			var oListServices = new sap.m.List({
  				headerToolbar : new sap.m.Toolbar({
		        		 content : [/*
			        		 new sap.m.Title({
			        			 text: 
			        		 }),*/
			        		 new sap.m.SearchField({
			        			 
			        			 placeholder: Utils.fnReadTranslate("MonitorAppointments.ValueHelpServices.SearchField.Placeholder"),
			        			 search: function(oEvt){
			        				 
			        				 var aFilters = [];
			        				 var sQuery = oEvt.getSource().getValue();
			        				 if (sQuery && sQuery.length > 0) {
			        						
			        						var orFilter = [];
			        						orFilter.push(new sap.ui.model.Filter("nombre", sap.ui.model.FilterOperator.Contains, sQuery));
			        						orFilter.push(new sap.ui.model.Filter("id_pais", sap.ui.model.FilterOperator.Contains, sQuery));

			        						aFilters.push(new sap.ui.model.Filter(orFilter, false));
			        				 }

			        				 // update list binding
			        				 var binding = oListServices.getBinding("items");
			        				 binding.filter(aFilters);
			        			 },
			        			 width: "100%"
			        		 })
		        		 ]
		        	 }),
		        	 mode: "MultiSelect",
		        	 includeItemInSelection: true,
		        	 growing:true,
		        	 growingThreshold:10,
		        	 busyIndicatorDelay:500,
		        	 enableBusyIndicator:true,
		        	 items: {
						path: 'mCatalogs>/SERVICES',
						template: new sap.m.StandardListItem({
							title: "{mCatalogs>description}",
							description: "{mCatalogs>duration}",
							info: "{mCatalogs>price}"
						})
					 }
		        });
  			
  			oListServices.attachSelectionChange(function(oEvent) {
  				var oContext = oEvent.getParameter("listItem").getBindingContext("mCatalogs");
      			
  				var sId = oContext.getProperty("id");
      			var sDesc = oContext.getProperty("description");
      			var oBand = 0;
      			
      			if(aServices.length == 0)
      				aServices.push( new sap.m.Token({ key: sId, text: sDesc}) );
      			
      			else{
          			for(var i=0; i<aServices.length; i++){
          				
          				if(aServices[i].getKey() == sId){
          					aServices.splice(i, 1);
          					oBand=0;
          					break;
          				}
          				else{
          					oBand= 1;
          				}
          			}
      			}
      			
      			if(oBand == 1)
      				aServices.push( new sap.m.Token({ key: sId, text: sDesc}) );
      			
  			});
  			
  			var oDialog = new sap.m.Dialog({
 				title: Utils.fnReadTranslate("MonitorAppointments.ValueHelpServices.Title"),
 				stretch : (sap.ui.Device.system.desktop === true) ? false : true,
 				content: [
 				          oListServices
 				],
 				buttons:[ 
 				         new sap.m.Button({
         					text: Utils.fnReadTranslate("Button.Accept"),
         					press: function () {
         						
         						sMultiInput.setTokens(  aServices );
         						oDialog.close();
         					}
         				 }),
				         new sap.m.Button({
	         					text: Utils.fnReadTranslate("Button.Cancel"),
	         					press: function () {
	         						oDialog.close();
	         					}
	         				}),
 				],
 				afterClose: function() {
 					oDialog.destroy();
 					// Limpiar modelo de Grupos
 					//oCore.getModel("mCatalogs").setProperty("/AllGroups", []);
 					
 					if(sMultiInput.getTokens().length > 0)
 						sMultiInput.setValueState("None");
 					
 				},
 				afterOpen: function(){
 					
 				}
 			})//.addStyleClass("ResponsiveDialog");
 			oDialog.open();
			 
			//Remembers selected tokens
 			if( sMultiInput.getTokens().length>0 ){
  				for(var i=0; i<oListServices.getItems().length; i++){
  					
      				var item = oListServices.getItems()[i];
      				var sPathI = item.getBindingContextPath();
      				var oModel = oCore.getModel('mCatalogs');
       				//Obtener data
       				var objctL = oModel.getProperty(sPathI);
       				              					
  					for(var j=0; j<sMultiInput.getTokens().length; j++){
  						if( objctL.id == sMultiInput.getTokens()[j].getKey() ){
      						oListServices.setSelectedItem(item, true, true);
      					}
  					}
      			}
  			};
		},
    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf com.exonmarcelo.geser.webapp.view.Content2
     */
    //	onAfterRendering: function() {
    //
    //	},

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf com.exonmarcelo.geser.webapp.view.Content2
     */
    //	onExit: function() {
    //
    //	}
  });
});
