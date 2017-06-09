(function (controllers){
    var homeController=require("./homeController");
    var contractorsController=require("./contractorsController");
    var subcontractorsController=require("./subcontractorsController");
    var payrollController=require("./payrollController");
     
    controllers.init = function(app){
        homeController.init(app);
        contractorsController.init(app);
        subcontractorsController.init(app);
        payrollController.init(app);
    };
    
    
    
})(module.exports);