CREATE TABLE userData (
  userID INT PRIMARY KEY IDENTITY,
  regNo VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  userPassword VARCHAR(50) NOT NULL,
  position VARCHAR(50) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL
);