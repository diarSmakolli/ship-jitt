module.exports = (invoiceNumber, invoiceDetails) => `
<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet"
        type="text/css" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700;800&display=swap');

        * {
            box-sizing: border-box;
        }


        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        sup,
        sub {
            line-height: 0;
            font-size: 75%;
        }

        #converted-body .list_block ul,
        #converted-body .list_block ol,
        .body [class~="x_list_block"] ul,
        .body [class~="x_list_block"] ol,
        u+.body .list_block ul,
        u+.body .list_block ol {
            padding-left: 20px;
        }

        @media (max-width:720px) {

            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body class="body"
    style="background-color: #fefffe; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fefffe;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f9fc;" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f9fc; color: #000000; width: 700px; margin: 0 auto;"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                    width="100%">
                                                    <div class="spacer_block block-1"
                                                        style="height:30px;line-height:30px;font-size:1px;"> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f9fc;" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fefffe; margin-top: 50px !important; color: #000000; 
										width: 700px; margin: 0 auto; border-top-left-radius: 20px; border-top-right-radius: 20px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; 
                                                    text-align: left; padding-bottom: 5px; padding-top: 20px; vertical-align: top; 
                                                    border-radius: 20px 20px 20px 20px; border-top: 0px; border-right: 0px; 
                                                    border-bottom: 0px; border-left: 0px;" width="100%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-1" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>


                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:10px;">
                                                                <div
                                                                    style="color:white;font-family:'Montserrat','Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;font-size:32px;line-height:120%;text-align:left;mso-line-height-alt:38.4px;">

                                                                    <p style="margin: 0; word-break: break-word;">
                                                                        <!-- <span style="word-break: break-word; color: #010001;
																				font-family: 'Bricolage Grotesque'; font-size: 30px;
																			">
                                                                            Ship jitt
                                                                        </span> -->
                                                                        <img src="https://scontent.fprn4-1.fna.fbcdn.net/v/t1.15752-9/458180391_2436434596553247_5487281233083388446_n.png?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=N7hNwBuI0OoQ7kNvgHFaT8M&_nc_ht=scontent.fprn4-1.fna&oh=03_Q7cD1QGdQfX90yuPU7YQmYNUOlQj9bi7-kNbNurawvl3tY0_gg&oe=6706BEF2"
                                                                            width="120px" height="auto" />
                                                                    </p>


                                                                    <p
                                                                        style="margin: 0; word-break: break-word; margin-top: 20px;">
                                                                        <span style="word-break: break-word; color: #010001; font-size: 25px;
                                                                            font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;
                                                                            ">
                                                                            Invoice from
                                                                           
                                                                            Shipjitt </span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>


                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-2" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            We attempted to process your recent payment but unfortunately,
                                                                            the transaction failed. Please review the details below:
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>



                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-3" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fefffe; color: #000000; width: 700px; margin: 0 auto;"
                                                        width="100%">
                                                        

                                                        <tr style="padding-left: 30px; padding-right: 30px;">
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>Invoice #${invoiceNumber}</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>${invoiceDetails.date}</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>


                                                        </tr>



                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>Amount</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>$${invoiceDetails.amount}</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>


                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>Status</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>${invoiceDetails.status}</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>Payment method</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>${invoiceDetails.paymentMethod}</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>Package name</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            <strong>${invoiceDetails.planName} x 1</strong>
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </table>

                                                    <div style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                        <hr />
                                                    </div>

                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                    class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; 
                                                    border-radius: 20px !important; padding-bottom: 0px;"
                                                    width="100%">
                                                    <tr>
                                                        <td class="pad"
                                                            style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                            <div
                                                                style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                <p style="margin: 0;"><span
                                                                        style="word-break: break-word; color: #010001;">
                                                                        Alternatively, you can find the invoice attached to this email.
                                                                        <br />

                                                                    </span></p>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td class="pad"
                                                            style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                            <div
                                                                style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                <p style="margin: 0;"><span
                                                                        style="word-break: break-word; color: #010001;">
                                                                        You can make the payment through the Bank Transfer,
                                                                        The details are in the Invoice, and send the
                                                                        payment confirmation to our email.
                                                                        <br />

                                                                    </span></p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>



                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word; 
                                                        border-radius: 20px !important; padding-bottom: 30px;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7c7c7c;font-family:-apple-system,'SF Pro Display','SF Pro Text','Helvetica',sans-serif;font-size:16px;line-height:150%;text-align:left;mso-line-height-alt:24px;">
                                                                    <p style="margin: 0;"><span
                                                                            style="word-break: break-word; color: #010001;">
                                                                            If you need any assistance, feel free to contact our support team at 
                                                                            support@shipjitt.com, and we'll be happy to help.
                                                                            
                                                                            <br />

                                                                        </span></p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        
                                                    </table>





                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>




                    <!-- Footer  -->

                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f9fc;" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f9fc; color: #000000; width: 700px; margin: 0 auto;"
                                        width="700">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 35px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                    width="100%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-1" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:15px;">
                                                                <div
                                                                    style="color:#7C7C7C;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:180%;text-align:center;mso-line-height-alt:25.2px;">
                                                                    <p style="margin: 0;"><strong>Shipjitt, 302 Jeton
                                                                            Terstena, Vushtrri, XK 42000</strong>
                                                                    </p>

                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </table>
                                                    <!--  -->
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>
`;