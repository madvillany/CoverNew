<?php

	$COVERU_URL = "http://google.com";
	$AETNA_LOGO_URL = "http://modpreview.com/";
	$AETNA_EMAIL = "jroberts@modworldwide.com";

	header('Content-Type: application/json');

	$emailBefore = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title></title>

<style type="text/css">
	
  /* reset */
  #outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */ 
  .ExternalClass {width:100%;} /* Force Hotmail to display emails at full width */  
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Forces Hotmail to display normal line spacing.  More on that: http://www.emailonacid.com/forum/viewthread/43/ */ 
  p {margin: 0; padding: 0; font-size: 0px; line-height: 0px;} /* squash Exact Target injected paragraphs */
  table td {border-collapse: collapse;} /* Outlook 07, 10 padding issue fix */
  table {border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } /* remove spacing around Outlook 07, 10 tables */
  
  /* bring inline */
  img {display: block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
  a img {border: none;} 
  a {text-decoration: none; color: #000001;} /* text link */
  a.phone {text-decoration: none; color: #000001 !important; pointer-events: auto; cursor: default;} /* phone link, use as wrapper on phone numbers */
  span {font-size: 13px; line-height: 17px; font-family: monospace; color: #000001;}

</style>
<!--[if gte mso 9]>
  <style>
  /* Target Outlook 2007 and 2010 */
  </style>
<![endif]-->
</head>
<body style="width:100%; margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

<!-- body wrapper -->
<table cellpadding="0" cellspacing="0" border="0" style="margin:0; padding:0; width:100%; line-height: 100% !important;">
  <tr>
    <td valign="top">
      <!-- edge wrapper -->
      <br>
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="background: #00A78E;">
        <tr>
          <td valign="top">
            <!-- content wrapper -->
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="560">
              <tr>
                <td valign="top" style="vertical-align: top;">

<table cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td valign="top" style="vertical-align: top; padding: 20px">
      <img src="'.$AETNA_LOGO_URL.'" alt="alt text" title="title text" width="100" style="width: 100px;"/>
    </td>
  </tr>
</table>

<table cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td valign="top" style="vertical-align: top; padding: 20px">
      <span style="font-family: Calibri, Helvetica, sans-serif; color: #fff; font-size: 18px">Hi,<br><br>';


$emailBottom = '
		</span>
    </td>
  </tr>
</table>

<table cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td valign="top" style="padding: 20px">
      <span style="font-family: Calibri, Helvetica, sans-serif; color: #fff; font-size: 12px; font-style: italic">&copy; 2015 Aetna Inc.<br>
        15.36.511.1 (7/15)<br>
        Fully insured student health insurance plans are underwritten by Aetna Life Insurance Company (Aetna). Self‐insured plans are funded by the applicable school, with claims administration services provided by Aetna Life Insurance Company. Aetna Student Health&#8480; is the brand name for products and services provided by Aetna Life Insurance Company and its applicable affiliated companies (Aetna).
      </span>
    </td>
  </tr>
</table>
                </td>
              </tr>
            </table>
            <!-- / content wrapper -->
          </td>
        </tr>
      </table>
      <!-- / edge wrapper -->
    </td>
  </tr>
</table>  
<!-- / page wrapper -->
</body>
</html>';

	$subject = "Check out this student health information form Aetna";
	$youremail = $_POST['youremail']; 
	$theiremail = $_POST['theiremail'];
	$message = $_POST['message'];

	$jsonData = array(
		"isSuccessful" => false,
		"status" => 0
	);

	$copyOptions = array(  
		"parent" => 'An Aetna Student Health plan may be a good fit for you. <a href="'.$COVERU_URL.'" style="color: #fff; text-decoration: underline">Click here</a> to learn more.',
		"student" => '<a href="'.$COVERU_URL.'" style="color: #fff; text-decoration: underline">Click here</a> to learn more about health insurance and Aetna.'
	);
	
	//Checking for blank Fields..
	if($youremail == "" || $theiremail == "" || $message == ""){

		$jsonData['status'] = 1;

	} else{
		
		 // Sanitize e-mail address
		$youremail = filter_var($youremail, FILTER_SANITIZE_EMAIL);
		$youremail = filter_var($youremail, FILTER_VALIDATE_EMAIL);
		$theiremail = filter_var($theiremail, FILTER_SANITIZE_EMAIL);
		$theiremail = filter_var($theiremail, FILTER_VALIDATE_EMAIL);

		 if (!$theiremail || !$youremail){

		 		$jsonData['status'] = 1;

		 } else {


			$headers = 'From: Aetna <'+ $AETNA_EMAIL + ">\r\n"; 
			$headers .= 'Reply-To: Your Friend <'+ $youremail + ">\r\n"; 
			$headers .= 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

			$html = $emailBefore . $copyOptions[$message] . $emailBottom;

			$jsonData['status'] = 0;
			mail($theiremail, $subject, $html, $headers);
		}
	}

	echo json_encode((object)$jsonData);	

?>
