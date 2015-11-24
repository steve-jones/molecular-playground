
insert into admins values ('timrichards', 'password', 'Tim', 'Richards', 'UMass Amherst');
insert into admins values ('rodgrupen', 'password', 'Rod', 'Grupen', 'UMass Amherst');
insert into admins values ('admin', 'admin', 'admin', 'admin', 'UMass Amherst');

insert into students values ('test', 'password', 'test', 'testt', 'Senior', 'UMass Amherst', 4.0, 'General Computer Science');
insert into students values ('samfox', 'password', 'Sam', 'Fox', 'Senior', 'UMass Amherst', 4.0, 'General Computer Science');
insert into students values ('yongliang', 'password', 'Yong', 'Liang', 'Junior','UMass Amherst', 4.0, 'Artificial Intellignce');
insert into students values ('alexrevello', 'password', 'Alex', 'Revello', 'Sophomore', 'UMass Amherst', 4.0, 'Security & Privacy');
insert into students values ('joshbearor', 'password', 'Josh', 'Bearor', 'Freshman', 'UMass Amherst', 4.0, 'Search & Data Mining');
insert into students values ('drewmarchetti', 'password', 'Drew', 'Marchetti', 'Senior', 'UMass Amherst', 4.0, 'Artificial Intelligence');
insert into students values ('khanhnguyen', 'password', 'Khanh', 'Nguyen', 'Freshman', 'UMass Amherst', 4.0, 'General Computer Science');

insert into coursecatalog values ('CS105', 'Computer Literacy', 3, 'Fall/Spring/Summer', 'Smith');
insert into coursecatalog values ('CS119', 'Introduction to Programming', 3, 'Fall/Spring', 'Smith');	
insert into coursecatalog values ('CS121', 'Introduction to Problem Solving With Computers', 4, 'Fall/Spring', 'Smith');
insert into coursecatalog values ('CS187', 'Programming with Data Structures', 4, 'Fall/Spring', 'Smith');

insert into prerequisites values ('CS187', 'CS105');
insert into prerequisites values ('CS187', 'CS119');