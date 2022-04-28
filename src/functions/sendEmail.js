const nodemailer = require('nodemailer');

module.exports = {
  async sendEmail (data) {

    var transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com',
      port: 465,
      secure: true, // this is true as port is 465
        auth: {
            user: process.env.GMAIL_USERNAME, // generated ethereal user
            pass: process.env.GMAIL_PASSWORD, // generated ethereal password
        },
    });
    
    await transporter.sendMail({
      to: data.email, // Change to your recipient
      from: 'w@wlissesmenezes.adv.br', // Change to your verified sender
      subject: data.subject,
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=Edge">
          <!--<![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
            body {width: 600px;margin: 0 auto;}
            table {border-collapse: collapse;}
            table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
            img {-ms-interpolation-mode: bicubic;}
          </style>
          <![endif]-->
          <style type="text/css">
            body, p, div {
            font-family: inherit;
            font-size: 14px;
            }
            body {
            color: #000000;
            }
            body a {
            color: #000000;
            text-decoration: none;
            }
            p { margin: 0; padding: 0; }
            table.wrapper {
            width:100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            }
            img.max-width {
            max-width: 100% !important;
            }
            .column.of-2 {
            width: 50%;
            }
            .column.of-3 {
            width: 33.333%;
            }
            .column.of-4 {
            width: 25%;
            }
            ul ul ul ul  {
            list-style-type: disc !important;
            }
            ol ol {
            list-style-type: lower-roman !important;
            }
            ol ol ol {
            list-style-type: lower-latin !important;
            }
            ol ol ol ol {
            list-style-type: decimal !important;
            }
            @media screen and (max-width:480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
            text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
            text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
            font-size: 80% !important;
            padding: 5px 0;
            }
            table.wrapper-mobile {
            width: 100% !important;
            table-layout: fixed;
            }
            img.max-width {
            height: auto !important;
            max-width: 100% !important;
            }
            a.bulletproof-button {
            display: block !important;
            width: auto !important;
            font-size: 80%;
            padding-left: 0 !important;
            padding-right: 0 !important;
            }
            .columns {
            width: 100% !important;
            }
            .column {
            display: block !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            }
            .social-icon-column {
            display: inline-block !important;
            }
            }
          </style>
          <!--user entered Head Start-->
          <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
          <style>
            body {font-family: 'Lato', sans-serif;}
          </style>
          <!--End Head user entered-->
        </head>
        <body>
          <center class="wrapper" data-link-color="#000000" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
            <div class="webkit">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                <tr>
                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <!--[if mso]>
                                <center>
                                  <table>
                                    <tr>
                                      <td width="600">
                                        <![endif]-->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                          <tr>
                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left">
                                              <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                                <tr>
                                                  <td role="module-content">
                                                    <p></p>
                                                  </td>
                                                </tr>
                                              </table>
                                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d651ef67-7f56-4ff0-bb05-fa04021373c1">
                                                <tbody>
                                                  <tr>
                                                    <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6bb27840-d5c1-4f5a-84e0-30eb8a115409">
                                                <tbody>
                                                  <tr>
                                                    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                                      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="600" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/f1a5c3839c29043d/83d9de7b-f5dd-4137-8e24-909003578ea7/628x252.png" height="">
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d651ef67-7f56-4ff0-bb05-fa04021373c1.1">
                                                <tbody>
                                                  <tr>
                                                    <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7cd4c72c-c042-4c16-82f3-4aca5b1f0da3" data-mc-module-version="2019-10-22">
                                                <tbody>
                                                  <tr>
                                                    <td style="padding:50px 40px 40px 40px; line-height:28px; text-align:inherit; background-color:#f8f8f8;" height="100%" valign="top" bgcolor="#f8f8f8" role="module-content">
                                                      <div>
                                                        <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-size: 24px; font-family: inherit">${data.title}</span></div>
                                                        <br>
                                                        <div><span style="color: #000000; font-size: 32px; font-family: inherit; font-weight: bold;">${data.token}</span></div>
                                                        <br>
                                                        <div style="font-family: inherit; text-align: inherit"><span style="color: #000000; font-size: 24px; font-family: inherit">${data.subtitle}</span></div>
                                                        <div></div>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="f4a77ac4-65c4-470a-a564-646acdd83093">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" bgcolor="#f8f8f8" class="outer-td" style="padding:0px 0px 15px 0px; background-color:#f8f8f8;">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                                        <tbody>
                                                          <tr>
                                                            <td align="center" bgcolor="#FFCD37" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                                              <a href="${data.link}" style="background-color:#FFCD37; border:1px solid #fbde67; border-color:#fbde67; border-radius:10px; border-width:1px; color:#000000; display:inline-block; font-size:16px; font-weight:700; letter-spacing:0px; line-height:22px; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit; width:210px;" target="_blank">${data.label}</a>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b5ec95f4-9902-4d4d-acdc-8952190a117f">
                                                <tbody>
                                                  <tr>
                                                    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                                                      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                                        <tbody>
                                                          <tr>
                                                            <td style="padding:0px 0px 10px 0px;" bgcolor="#fbde67"></td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b5166920-fe70-4cb5-abe8-85faa2aca93d">
                                                <tbody>
                                                  <tr>
                                                    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                                      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="600" alt="" data-proportionally-constrained="true" data-responsive="false" src="http://cdn.mcauto-images-production.sendgrid.net/954c252fedab403f/82017d6b-d648-4b66-98b2-e55752bc2092/600x331.png" height="331">
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
                                                <div class="Unsubscribe--addressLine"></div>
                                                <p style="font-size:12px; line-height:20px;"><a target="_blank" class="Unsubscribe--unsubscribeLink zzzzzzz" href="{{{unsubscribe}}}" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p>
                                              </div>
                                              <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="0644ff51-38f7-4da6-bb03-37fee41f8046">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
                                                      <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                                        <tbody>
                                                          <tr>
                                                            <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="http://165.227.207.148/" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:#a8b9d5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">Atrium - Legal tech</a></td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                        <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                </center>
                                <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </center>
        </body>
      </html>
      `
    });
  }
}
