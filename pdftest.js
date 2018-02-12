var pdf = require('dynamic-html-pdf');
console.log('setting html');
var html =` 
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
  padding:0px;
  width:700px;
  overflow:hidden;

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
text-align:left;
}
td {
padding:0px;
font-size:.70em;
white-space: nowrap;
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
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<link rel="stylesheet" href="print.css" type="text/css" media="print">
</head>

<body>
    <div id="page" class="print">
        <div class="report-url" data-url="/api/reports/contractorMonthlyReturn/0/21-08-2017/pdf" data-name="Contractor Monthly Return" />

  <div id="logo"> <img src="http://www.paygenieonline.co.uk/images/KodeCom.png" alt="Kodecom"></div><!--end logo-->
  <div id="address">
    <p><strong>Contractor Monthly Return</strong><br />
                <strong>For          :</strong>Kerr Ltd<br />
                <strong>Month Ending : </strong>21/08/2017<br />
                <strong>Tax Reference: </strong>1111111111<br />
        </p>
  </div>
  <div id="content">
  <p>
    <strong>SubContractor Details:</strong><br />
        </p>
    <table class="topAndBottom">
      <tr><th><strong>Name</strong></th><th><strong>Verification No</strong></th><th><strong>UTR</strong></th><th><strong>NINO</strong></th><th><strong>Total Payments</strong></th><th><strong>Cost of Materials</strong></th><th><strong>Tax Deducted</strong></th></tr>
         
         <tr class="odd">
                  <td> Kerr Sub </td>  
      <td> 23 </td>  
                  <td>  </td> 
                  <td> JT676767A </td> 
                  <td> £1,000.00 </td> 
                  <td> £20.00 </td>
                  <td> £196.00 </td>
                 </tr>

    </table>
        <br />
    <p>
                <dl>
                  <dt><strong>Total Payments    : </strong></dt><dd>£1,000.00</dd><br />
                  <dt><strong>Cost of Materials : </strong></dt><dd>£20.00</dd><br />
                  <dt><strong>Tax Deducted      : </strong></dt><dd>£196.00</dd><br />
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
    
    
</body>
</html> 
      `;

var options = {
    format: "A4",
    orientation: "landscape",
    border: "10mm"
};

var document = {
    template: html,
    context: {
        user: 'User'
    },
    path: "./output.pdf"
};

pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });