USE ProductSystem;
GO
CREATE OR ALTER PROCEDURE  updateCategory(@ID VARCHAR(255), @Name VARCHAR(255))
AS
BEGIN
    UPDATE Categories SET CNAME = @NAME  WHERE ID=@ID
END 

