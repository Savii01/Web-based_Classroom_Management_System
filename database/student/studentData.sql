/*
   Friday, July 7, 20238:50:58 AM
   User: sa
   Server: Savii\SQLVER19
   Database: OnlineClassroom
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.studentData ADD
	createdAt varchar(50) NULL,
	updatedAt varchar(50) NULL
GO
ALTER TABLE dbo.studentData SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.studentData', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.studentData', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.studentData', 'Object', 'CONTROL') as Contr_Per 