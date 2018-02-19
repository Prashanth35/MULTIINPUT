sap.ui.controller("multiinput.VIEW", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf multiinput.VIEW
*/
onInit: function() {
	
	
	var oModel = new sap.ui.model.json.JSONModel()
	  oModel.loadData("model/model.json");
      this.getView().setModel(oModel);
},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf multiinput.VIEW
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf multiinput.VIEW
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf multiinput.VIEW
*/
//	onExit: function() {
//
//	}
	onPress : function(){
	   var inputv=this.getView().byId("multiInput")
	   inputv.setModel(oModel);
		var that=this;
		var oModel = new sap.ui.model.json.JSONModel()
		  oModel.loadData("model/model.json");


		
		 var selDialogue = new sap.m.SelectDialog({multiSelect:true, 
			 
			 title: "Person Selection Helper",
			 
			 liveChange: function(oEvent) {
					var sValue = oEvent.getParameter("value");
					
					var oFilter = new sap.ui.model.Filter("person", sap.ui.model.FilterOperator.Contains, sValue);
					
					var oBinding = oEvent.getSource().getBinding("items");
					
					oBinding.filter([oFilter]);
					},
			 noDataText: "No Plant Information Found",
			 
			 
			 
			 confirm : function(oEvent){
		 /*
		            debugger;
		            for( i=0;i< oEvent.getSource().getItems().length;i++){
		           var sPath= oEvent.getSource().getItems()[0].getBindingContext().getPath()
		           
		            that.getView().byId("idId").setValue("{/designation}")
		            
		            }*/
			for (i = 0; i < oEvent.getParameter("selectedItems").length; i++) { 
				 
				var title=oEvent.getParameter("selectedItems")[i].getTitle();
				
				that.getView().byId("multiInput").addToken(	
						new sap.m.Token({text:title}))
			}
			
		 }
         });
		 selDialogue.setModel(oModel);
		/*selDialogue.bindAggregation("items","/data",otemp)
		var otemp =	 new sap.m.List({			
				mode : sap.m.ListMode.MultiSelect,
				items: [	
				        	new sap.m.StandardListItem({
				        		title :"{person}"			
				        							   })
	                    ]
			
	});*/
		 
		 selDialogue.bindAggregation("items",{
	            path:"/data",
	            template: new sap.m.StandardListItem({
	            	
	              	title:"{person}"
	            })
	          })
		 
		 
		 
        // selDialogue.addItem(template)
        
        
         selDialogue.open();
		
		/*
		var otemp=	 new sap.m.List({			
			mode : sap.m.ListMode.MultiSelect,
			items: [	
			        	new sap.m.StandardListItem({
			        		title :"item", info :"cost"				
			        							   })
                    ]
		
});*/
		
		
		
	},
	onSubmit : function(oEvent){
		
		debugger;
		var array=[];
		
		for (i = 0; i < this.getView().byId("multiInput").getTokens().length; i++) { 
			var inpuvalue=this.getView().byId("multiInput").getTokens()[i].getText()
			   array.push(inpuvalue);
					this.getView().byId("idId").setValue(array[0])
					this.getView().byId("idCompany").setValue(array[1])
					this.getView().byId("iddesignation").setValue(array[2])
		}
		
		
		
		
	}


});