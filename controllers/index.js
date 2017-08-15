(function (controllers){
    var homeController=require("./homeController");
    var contractorsController=require("./contractorController");
    var subcontractorsController=require("./subcontractorsController");
    var payrollController=require("./payrollController");
    var ownerController=require("./ownerController");
    var reportsController=require("./reportsController");
     
    controllers.init = function(app){
        homeController.init(app);
        contractorsController.init(app);
        subcontractorsController.init(app);
        payrollController.init(app);
        ownerController.init(app);
        reportsController.init(app);
    };
    
    
    
})(module.exports);