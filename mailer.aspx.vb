Imports System.IO

Imports System

Imports System.Web.Services

Imports System.Reflection

Imports System.Web.Script.Services



Public Class mailer

    Inherits System.Web.UI.Page

    Private Const parent_message As String = "Hi, An Aetna Student Health plan may be a good fit for you. <a href={0}>Click here</a> to learn more."
    Private Const student_message As String = "Hi, <a href={0}>Click here</a> to learn more about Student Health insurance and Aetna."

    <System.Web.Services.WebMethod()> _
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    Public Shared Function SendEmail(ByVal theiremail As String, ByVal youremail As String, ByVal message As String) As String



        Dim json As String = "0"



        Try



            Dim subject As String = "Check out this student health information from Aetna"



            Dim objValidation As New InputValidation



            If Not objValidation.IsInputValid("EMAIL", theiremail) Then

                json = "100"

                Exit Try

            End If



            If Not objValidation.IsInputValid("EMAIL", youremail) Then

                json = "200"

                Exit Try

            End If



            Dim templatePath As String = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), ConfigurationManager.AppSettings("MailerTemplate"))

            If Not File.Exists(templatePath) Then

                json = "500"

                Exit Try

            End If



            Dim templateFileContent As String = File.ReadAllText(templatePath)

   

            If message = "child" Then

                templateFileContent = templateFileContent.Replace("$MESSAGE", String.Format(student_message, ConfigurationManager.AppSettings("ASHStudentConnection")))

            ElseIf message = "student" Then

                templateFileContent = templateFileContent.Replace("$MESSAGE", String.Format(student_message, ConfigurationManager.AppSettings("ASHStudentConnection")))

            ElseIf message = "parent" Then

                templateFileContent = templateFileContent.Replace("$MESSAGE", String.Format(parent_message, ConfigurationManager.AppSettings("ASHStudentConnection")))

            Else

                json = "500"

                Exit Try

            End If



            templateFileContent = templateFileContent.Replace("$AETNA_LOGO_URL", "<img src=cid:myImageID>")



            Dim objMail As New ASHCommonClass

            objMail.SendEmailAetnaLogo(youremail, theiremail, Nothing, subject, templateFileContent, Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~"), "CoverU\img\logo.png"))





        Catch ex As Exception

            json = "500"

            Err.Clear()

        End Try



        Return json

    End Function







End Class