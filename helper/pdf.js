(function(renderer){
    var pdf = require('phantom-html2pdf');
    //var pdf = require('html-pdf');
    
    renderer.render = function(option,cb){
        
    var pdfOptions = {
      html: option.html,
      paperSize: {
        format: 'A4',
        orientation: 'landscape', // portrait
      }
    };
  
        pdf.convert(pdfOptions, function(err, result) {
        console.log(option.html);
        cb(err,result);
       
        
    });
      
  }
  
  renderer.testPdf = function(option,cb){
      var html =`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html>
<head>
<title>Contractor Monthly Return</title>
<style type="text/css" media="all">
body {
  font-family:Tahoma;  
  font-size:12px;
}
img {
  border:0;
}

#page {
   margin:0 auto;
  padding:0px;

}

#logo {
  float:left;
  margin:0;
}

#address {
  height:192px;
  margin-left:250px;
  margin-top:50px;
  float:right;
}

#content {
padding-top:200px;
}

table {
  width:100%;
  table-layout:auto
  
}

th {
padding:0px;
font-size:.85em;
font-color:red;
text-align:left;
}
td {
padding:0px;
font-size:.70em;
}


table td.absorbing-column {
    width: 100%;
        text-align:center; 
    vertical-align:middle;
        word-wrap:break-word
}


tr.odd {
  background:#e1ffe1;
}

.special div {
    border-bottom: 2px solid black;
    margin: -2px;
}

.topBottom div {
    border-bottom: 2px solid black;
        border-top: 2px solid black;
    margin: -2px;
}

.alignRight p {
text-align:right;}

.box div {

    border: 2px solid black;
    
}

dl {border-top:1px solid black;  border-bottom:1px solid black;}
dt { float: left; clear: left; font-weight: bold; font-size:.70em;}
dd { float: right; font-size:.70em;}

table.topAndBottom {
  border-top:1px solid black;
  border-bottom:1px solid black;
}


</style>
</head>

<body>
    <div id="page">
    <div class="report-url" data-url="/api/reports/contractorMonthlyReturn/42/14-08-2017" />

  <div id="logo"> <img src="https://kode-com-kerrjp.c9users.io/images/KodeCom.png" alt="Kodecom"></div><!--end logo-->
  <div id="address">
    <p><strong>Contractor Monthly Return</strong><br />
                <strong>For          :</strong>B&amp;B Maintenance Ltd<br />
                <strong>Month Ending : </strong>14/08/2017<br />
                <strong>Tax Reference: </strong>3610517513<br />
        </p>
  </div>
  <div id="content">
  <p>
    <strong>SubContractor Details:</strong><br />
        </p>
        
    <table class="topAndBottom">
      <tr><th><strong>Name</strong></th><th><strong>Verification No</strong></th><th><strong>UTR</strong></th><th><strong>NINO</strong></th><th><strong>Total Payments</strong></th><th><strong>Cost of Materials</strong></th><th><strong>Tax Deducted</strong></th></tr>
         
         <tr class="odd">
                  <td> Naveen John, Hodge </td>  
      <td> V1146673719 </td>  
                  <td> 4612369203 </td> 
                  <td> NB925501A </td> 
                  <td> £1,000.00 </td> 
                  <td> £10.00 </td>
                  <td>  </td>
                 </tr><tr class="">
                  <td> Terrance, Johnson </td>  
      <td> V1146673719 </td>  
                  <td> 8840487849 </td> 
                  <td> NB526148B </td> 
                  <td> £0.00 </td> 
                  <td> £0.00 </td>
                  <td>  </td>
                 </tr>

    </table>
        <br />

    <p>
                <dl>
                  <dt><strong>Total Payments    : </strong></dt><dd>£1,000.00</dd><br />
                  <dt><strong>Cost of Materials : </strong></dt><dd>£10.00</dd><br />
                  <dt><strong>Tax Deducted      : </strong></dt><dd></dd><br />
                </dl>
                <br />
    </p>
      
    <p>
      <center><small>This communication is for the exclusive use of the addressee and may contain proprietary, confidential or privileged information. If you are not the intended recipient any use, copying, disclosure, dissemination or distribution is strictly prohibited.
      <br /><br />
          <strong>KODECOM is the trading name of Kode Compliance Ltd</strong>
      &copy; KODECOM All Rights Reserved
      </small></center>
    </p>
  </div><!--end content-->
</div>
    <div class="row">
        <a href='#' class='export-pdf'>Download</a>
    </div>
</body>
</html>`
 var pdfOptions = {
      html: html,
      paperSize: {
        format: 'A4',
        orientation: 'landscape', // portrait
        delay: 2000,
      }
    };
  
    
    pdf.convert(pdfOptions, function(err, result) {
        console.log(option.html);
        cb(err,result);
       
        
    });
    
        
    }
}(module.exports));