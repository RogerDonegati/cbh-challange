# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1- Database Update:
    Create a new table called Facilities_Custom_Ids, (this table will be used to improve our ShiftsReport) the table must have the following colomuns: 
        - Facilities_Custom_Id  Primary Key,
        - FacilityId  NOT NULL,
        - AgentId  NOT NULL,
        - CustomAgentId VARCHAR(128) NOT NULL,
        
    the following rules should be applied to the table:

        PRIMARY KEY (Facilities_Custom_Id)
        FOREIGN KEY (FacilityId) REFERENCES Facilities (Id)
        FOREIGN KEY (AgentId) REFERENCES Agents (Id)
        CREATE UNIQUE INDEX FacilityId_AgentId ON table_name (FacilityId, AgentId);
    
    Estimated Time: 4h
    Acceptance Criteria: The new table is created in local and development environments

### 2- Create a CRUD based on the table Facilities_Custom_Ids
    - Create the entity according to the table collumns, types and references in the database
    - Create the Repository with the following functions:
        -FindAll()
        -FindById(id)
        -FinByFacilityId(id)
        -Create(entity)
        -Update(id, entity)
        -Delete(id)

    Estimated Time: 8h
    Acceptance Criteria: 
        - It should be possible to Select, Insert, Update, Delete the new table programmatically
        - All the described functions are created and tested

### 3- Update the function "getShiftsByFacility" to use the new table "Facilities_Custom_Ids". 
    - Now it must return a new field called CustomAgentId wihtin the Agent Metadata. 
    - if no CustomAgentId is registered, the new field shoul still exists but with no value.
    - Use the function FindByFacilityId within the Facilities_Custom_Ids repository 

    Estimated Time: 6h
    Acceptance Criteria: The function getShiftsByFacility has a new "field" called Facilities_Custom_Id on the Agent Metadata

### 4- Update the function "generateReport" 
    - replace the AgentId for the Facilities_Custom_Ids in the PDF. 
    - if the Facilities_Custom_Ids is null then use the database AgentId

    Estimated Time: 6h
    Acceptance Criteria: 
    - The function generateReport outputing the Facilities_Custom_Ids in the PDF
    - The function generateReport is working for Facilities that have Facilities_Custom_Ids in *all* of their Agents
    - The function generateReport is working for Facilities that have Facilities_Custom_Ids in *some* of their Agents
    - The function generateReport is working for Facilities that do not have any Facilities_Custom_Ids 


 