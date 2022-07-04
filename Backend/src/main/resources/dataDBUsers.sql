CREATE TYPE typology AS ENUM ('C', 'A', 'D');

CREATE TABLE USERS
   (    
    CODE TEXT NOT NULL PRIMARY KEY,
    TYPOLOGY typology,
    ACTIVE BOOL,
    EMAIL TEXT,
    PW TEXT
    );

INSERT INTO USERS (CODE, TYPOLOGY,ACTIVE,EMAIL,PW)
VALUES
('C00001', 'C', 'true', 'cliente@gmail.com', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'),
('A001', 'A', 'true', 'agente@gmail.com', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'),
('A002', 'D', 'true', 'dirigente@gmail.com', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'),
('C00002', 'C', 'false', 'disabilitato@gmail.com', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86');
