const express = require("express");
const mysql = require("mysql");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// DATABASE CONNECTION OBJECT
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tracevision'
});

// DATABASE CONNECTION STATUS
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Add CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/Files', express.static(path.join(__dirname, 'files')));

app.use(express.json())

// Ensure uploads directory exists, if not create it
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
    console.log('Uploads directory created');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Use the absolute path here
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//ADMIN LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM login WHERE name = '${username}'`;
    db.query(sql, (err, data) => {
        if (data.length === 0) {
            res.json(false)
        } else {
            if (data[0].password === password) {
                res.json(true)

            } else {
                res.json(false)
            }
        }
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET DATA

//GET DATA FROM APPLICATIONS (RECRUITING & BENCH)
app.get('/application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM applications';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM HOTLISTAPPLICATION (HOTLIST)
app.get('/hotlist-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM hotlistapplication';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});


//GET DATA FROM JOBS (JOBS)
app.get('/jobs-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM jobs';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM PRIME (PRIME)
app.get('/prime-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM primevenders';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM CLIENTS (CLIENTS)
app.get('/clients-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM clients';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM CANDIDATES (HOTLIST)
app.get('/candidates-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM candidates';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM TRAINING (TRAINING)
app.get('/training-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM training';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM INTERVIEW (INTERVIEW)
app.get('/interview-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM interview';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM CANDIDATE ONBOARDING (CANDIDATE ONBOARDING)
app.get('/candidate-onboarding-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM candidateonboarding';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//GET DATA FROM EMPLOYEE ONBOARDING (EMPLOYEE ONBOARDING)
app.get('/employee-onboarding-application-data', (req, res) => {
    // Fetch data from the database
    const sql = 'SELECT * FROM employeeonboarding';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET SINGLE USER DATA

//GET DATA FROM APPLICATIONS USING ID (RECRUITING & BENCH)
app.get('/application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM applications WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM HOTLISTAPPLICATION USING ID (HOTLIST)
app.get('/hotlist-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM hotlistapplication WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM JOBS USING ID (JOBS)
app.get('/jobs-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM jobs WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM CLIENTS USING ID (CLIENTS)
app.get('/clients-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM clients WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM PRIME USING ID (PRIME)
app.get('/prime-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM primevenders WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM CANDIDATES USING ID (CANDIDATES)
app.get('/candidates-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM candidates WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM TRAINING USING ID (CANDIDATES)
app.get('/training-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM training WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM INTERVIEW USING ID (INTERVIEW)
app.get('/interview-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM interview WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM CANDIDATE ONBOARDING USING ID (CANDIDATE ONBOARDING)
app.get('/candidate-onboarding-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM candidateonboarding WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM EMPLOYEE ONBOARDING USING ID (EMPLOYEE ONBOARDING)
app.get('/employee-onboarding-application/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM employeeonboarding WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM USERDATA USING ID (STAFF USER)
app.get('/company-user/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "SELECT * FROM userdata WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

//GET DATA FROM USERDATA (STAFF USER)
app.get("/company-user", (req, res) => {
    const sql = "SELECT * FROM userdata"
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//GET DATA FROM APPLICATIONS FOR BARCHART (RECRUITING & BENCH)
app.get("/barchat-data", (req, res) => {
    const { fromDate, toDate, barchartCategoery } = req.query;
    const sql = `SELECT * FROM applications WHERE submittiondate BETWEEN ? AND ? AND category = ?`;
    db.query(sql, [fromDate, toDate, barchartCategoery], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET SEARCHED DATA
//GET DATA FROM ALL TABLES FOR EXCEL
app.get('/application-search-data', (req, res) => {
    // Fetch data from the database
    const query = req.query.search
    let tablename = req.query.tablename
    let sql
    if (tablename === "Recruiting"){
        sql = `SELECT * FROM applications WHERE category = 'Recruiting' AND (recruitername LIKE ? OR candidatename LIKE ?)`;
    }else if (tablename === "Bench"){
        sql = `SELECT * FROM applications WHERE category = 'Bench' AND (recruitername LIKE ? OR candidatename LIKE ?)`;
    }else if (tablename === "Hot"){
        sql = `SELECT * FROM hotlistapplication WHERE technology LIKE ? OR candidatename LIKE ?`;
    }else if (tablename === "Jobs"){
        sql = `SELECT * FROM jobs WHERE clientname LIKE ? OR recruitername LIKE ?`;
    }else if (tablename === "Prime"){
        sql = `SELECT * FROM primevenders WHERE recruitername LIKE ? OR vendorcompany LIKE ?`;
    }else if (tablename === "Clients"){
        sql = `SELECT * FROM clients WHERE recruitername LIKE ? OR clientname LIKE ?`;
    }else if (tablename === "Candidates"){
        sql = `SELECT * FROM candidates WHERE candidatename LIKE ? OR positiontitle LIKE ?`;
    }else if (tablename === "Training"){
        sql = `SELECT * FROM training WHERE candidatename LIKE ? OR coursename LIKE ?`;
    }else if (tablename === "Interview"){
        sql = `SELECT * FROM interview WHERE recruitername LIKE ? OR candidatename LIKE ?`;
    }else if (tablename === "CandidateOnboarding"){
        sql = `SELECT * FROM candidateonboarding WHERE emailaddress LIKE ? OR candidatename LIKE ?`;
    }else if (tablename === "Users"){
        sql = `SELECT * FROM userdata WHERE username LIKE ? OR email LIKE ?`;
    }else{
        sql = `SELECT * FROM applications WHERE recruitername LIKE ? OR candidatename LIKE ?`;
    }
    const values = [`%${query}%`, `%${query}%`]
    db.query(sql,values, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
            return;
        }
        res.json(result);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//POST

//POST TO USERDATA (STAFF USER)
app.post('/company-user', (req, res) => {
    const { username, email, password, usertype } = req.body
    const values = [username, email, password, usertype]
    const sql = "INSERT INTO userdata (`username`, `email`, `password`, `usertype`) VALUES (?)"
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return (res.json(data))
    })
})

// POST TO APPLICATIONS (RECRUITING & BENCH)
app.post('/form-data', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'r2r', maxCount: 1 },
    { name: 'driving', maxCount: 1 },
    { name: 'visa', maxCount: 1 },
    { name: 'msa', maxCount: 1 }
]), (req, res) => {
    const {
        category, recruiter, recruiterid, date, candidatename,
        clientname, pocname, feedback, remarks, cname, cemail,
        cphone, cssn, cpassport, cdriving, cphoto
    } = req.body;

    console.log(req.files['resume']);

    const resumePath = req.files['resume'] ? "uploads/" + req.files['resume'][0].filename : "";
    const r2rPath = req.files['r2r'] ? "uploads/" + req.files['r2r'][0].filename : "";
    const drivingPath = req.files['driving'] ? "uploads/" + req.files['driving'][0].filename : "";
    const visaPath = req.files['visa'] ? "uploads/" + req.files['visa'][0].filename : "";
    const msaPath = req.files['msa'] ? "uploads/" + req.files['msa'][0].filename : "";

    const values = [
        recruiter, category, recruiterid, candidatename,
        date, clientname, pocname, feedback, remarks, resumePath,
        r2rPath, drivingPath, visaPath, msaPath, cname, cemail,
        cphone, cssn, cpassport, cdriving, cphoto
    ]

    const sql = 'INSERT INTO applications (`recruitername`, `category`, `recruiterid`, `candidatename`, `submittiondate`, `clientname`, `pocname`, `feedback`, `remarks`, `resumefilepath`, `r2rfilepath`, `drivinglisencefilepath`, `visacopyfilepath`, `msacopyfilepath`, `cname`, `cemail`, `cphone`, `cssn`, `cpassport`, `cdriving`, `cphoto`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});


// POST TO HOTLISTAPPLICATION (HOTLIST)
app.post('/hotlist-form', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'r2r', maxCount: 1 },
    { name: 'driving', maxCount: 1 },
    { name: 'visa', maxCount: 1 }
]), (req, res) => {
    const { category, candidatename, email, phonenumber, technology, location, visastatus, remarks, resume } = req.body;
    const resumePath = req.files['resume'] ? "uploads/" + req.files['resume'][0].filename : "";
    const r2rPath = req.files['r2r'] ? "uploads/" + req.files['r2r'][0].filename : "";
    const drivingPath = req.files['driving'] ? "uploads/" + req.files['driving'][0].filename : "";
    const visaPath = req.files['visa'] ? "uploads/" + req.files['visa'][0].filename : "";
    const values = [category, candidatename, email, phonenumber, technology, location, visastatus, remarks, resumePath, r2rPath, drivingPath, visaPath]

    console.log(resume);
    const sql = 'INSERT INTO hotlistapplication (`category`, `candidatename`, `email`, `phonenumber`, `technology`, `location`, `visastatus`, `remarks`, `resumepath`, `r2rpath`, `drivingpath`, `visapath`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO JOBS (JOBS)
app.post('/jobs-form', (req, res) => {
    const {category, recruitmentdate, positiontitle, clientname, recruitername, location, jobdescription, notes } = req.body;
    const values = [category, recruitmentdate, positiontitle, clientname, recruitername, location, jobdescription, notes]
    const sql = 'INSERT INTO jobs (`category`, `recruitmentdate`, `positiontitle`, `clientname`, `recruitername`, `location`, `jobdescription`, `notes`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO PRIME (PRIME)
app.post('/prime-form', upload.fields([
    { name: 'msa', maxCount: 1 },
    { name: 'po', maxCount: 1 },
    { name: 'coi', maxCount: 1 }
]), (req, res) => {
    const { category, vendercompany, recruitername, phonenumber, email, faxnumber, companyaddress, branchlocation, notes } = req.body;
    const msaPath = req.files['msa'] ? "uploads/" + req.files['msa'][0].filename : "";
    const poPath = req.files['po'] ? "uploads/" + req.files['po'][0].filename : "";
    const coiPath = req.files['coi'] ? "uploads/" + req.files['coi'][0].filename : "";
    const values = [category, vendercompany, recruitername, phonenumber, email, faxnumber, companyaddress, branchlocation, notes, msaPath, poPath, coiPath]

    const sql = 'INSERT INTO primevenders (`category`, `vendorcompany`, `recruitername`, `phonenumber`, `email`, `faxnumber`, `companyaddress`, `branchlocation`, `notes`, `msapath`, `popath`, `coipath`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO CLIENTS (CLIENTS)
app.post('/clients-form', (req, res) => {
    const {category, clientname, clientwebsite, recruitername, recruiteremailid, recruitercontactnumber, jobportellink, notes } = req.body;
    const values = [category, clientname, clientwebsite, recruitername, recruiteremailid, recruitercontactnumber, jobportellink, notes]
    const sql = 'INSERT INTO clients (`category`, `clientname`, `clientwebsite`, `recruitername`, `recruiteremailid`, `recruitercontactnumber`, `jobportallink`, `notes`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO CANDIDATES (HOTLIST)
app.post('/candidates-form', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'r2r', maxCount: 1 },
    { name: 'driving', maxCount: 1 },
    { name: 'visa', maxCount: 1 }
]), (req, res) => {
    const { category, submittiondate, candidatename, emailid, phonenumber, positiontitle, visastatus, notes } = req.body;
    const resumePath = req.files['resume'] ? "uploads/" + req.files['resume'][0].filename : "";
    const r2rPath = req.files['r2r'] ? "uploads/" + req.files['r2r'][0].filename : "";
    const drivingPath = req.files['driving'] ? "uploads/" + req.files['driving'][0].filename : "";
    const visaPath = req.files['visa'] ? "uploads/" + req.files['visa'][0].filename : "";
    const values = [category, submittiondate, candidatename, emailid, phonenumber, positiontitle, visastatus, notes, resumePath, r2rPath, drivingPath, visaPath]

    const sql = 'INSERT INTO candidates (`category`, `submissiondate`, `candidatename`, `emailid`, `phonenumber`, `positiontitle`, `visastatus`, `notes`, `resumepath`, `r2rpath`, `drivinglicensepath`, `visapath`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO TRAINING (TRAINING)
app.post('/training-form', (req, res) => {
    const {category, enrollmentdate, candidatename, emailid, phonenumber, coursename, facultyname, notes} = req.body;
    const values = [category, enrollmentdate, candidatename, emailid, phonenumber, coursename, facultyname, notes]
    const sql = 'INSERT INTO training (`category`, `enrollmentdate`, `candidatename`, `emailid`, `phonenumber`, `coursename`, `facultyname`, `notes`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO INTERVIEW (INTERVIEW)
app.post('/interview-form', (req, res) => {
    const {category, interviewdate, recruitername, candidatename, technology, vendorrecruitername, vendorphonenumber, vendoremailid, endclient, interviewslot, interviewmode, position, billrate, feedback} = req.body;
    const values = [category, interviewdate, recruitername, candidatename, technology, vendorrecruitername, vendorphonenumber, vendoremailid, endclient, interviewslot, interviewmode, position, billrate, feedback]
    const sql = 'INSERT INTO interview (`category`, `interviewdate`, `recruitername`, `candidatename`, `technology`, `vendorrecruitername`, `vendorphonenumber`, `vendoremailid`, `endclient`, `interviewslot`, `interviewmode`, `position`, `billrate`, `feedback`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO CANDIDATE ONBOARDING (CANDIDATEONBORDING)
app.post('/candidate-onboarding-form', upload.fields([
    { name: 'passport', maxCount: 1 },
    { name: 'drivinglicense', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'i9', maxCount: 1 },
    { name: 'w4', maxCount: 1 },
    { name: 'bankahcform', maxCount: 1 },
    { name: 'adpform', maxCount: 1 },
    { name: 'medicalenrollmentform', maxCount: 1 },
    { name: 'experience', maxCount: 1 },
    { name: 'employeehandbook', maxCount: 1 },
    { name: 'offerletter', maxCount: 1 },
]), (req, res) => {
    const { category, candidatename, emailaddress, phonenumber, ssn } = req.body;
    const passportPath = req.files['passport'] ? "uploads/" + req.files['passport'][0].filename : "";
    const drivingPath = req.files['drivinglicense'] ? "uploads/" + req.files['drivinglicense'][0].filename : "";
    const photoPath = req.files['photo'] ? "uploads/" + req.files['photo'][0].filename : "";
    const i9Path = req.files['i9'] ? "uploads/" + req.files['i9'][0].filename : "";
    const w4Path = req.files['w4'] ? "uploads/" + req.files['w4'][0].filename : "";
    const bankahcformPath = req.files['bankahcform'] ? "uploads/" + req.files['bankahcform'][0].filename : "";
    const adpformPath = req.files['adpform'] ? "uploads/" + req.files['adpform'][0].filename : "";
    const medicalenrollmentformPath = req.files['medicalenrollmentform'] ? "uploads/" + req.files['medicalenrollmentform'][0].filename : "";
    const experiencePath = req.files['experience'] ? "uploads/" + req.files['experience'][0].filename : "";
    const employeehandbookPath = req.files['employeehandbook'] ? "uploads/" + req.files['employeehandbook'][0].filename : "";
    const offerletterPath = req.files['offerletter'] ? "uploads/" + req.files['offerletter'][0].filename : "";


    const values = [
        category, candidatename, emailaddress, phonenumber, 
        ssn, passportPath, drivingPath, photoPath, i9Path,
        w4Path, bankahcformPath, adpformPath, medicalenrollmentformPath, 
        experiencePath, employeehandbookPath, offerletterPath
     ]

    const sql = 'INSERT INTO candidateonboarding (`category`, `candidatename`, `emailaddress`, `phonenumber`, `ssn`, `passport`, `drivinglicense`, `photo`, `i9`, `w4`, `bankahcform`, `adpform`, `medicalenrollmentform`, `experience`, `employeehandbook`, `offerletter`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});

// POST TO EMPLOYEE ONBOARDING (EMPLOYEEONBORDING)
app.post('/employee-onboarding-form', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'preofferletter', maxCount: 1 },
    { name: 'onlinetest', maxCount: 1 },
    { name: 'markssheet10th', maxCount: 1 },
    { name: 'markssheet12th', maxCount: 1 },
    { name: 'degreeorbtech', maxCount: 1 },
    { name: 'pancard', maxCount: 1 },
    { name: 'aadharcard', maxCount: 1 },
    { name: 'experienceletters', maxCount: 1 },
]), (req, res) => {
    const { category, candidatename, emailaddress, phonenumber, hrmanager, examdate, location, fathername, mothername, parentphonenumber, feedback1, feedback2, feedback3 } = req.body;
    const resumePath = req.files['resume'] ? "uploads/" + req.files['resume'][0].filename : "";
    const preofferletterPath = req.files['preofferletter'] ? "uploads/" + req.files['preofferletter'][0].filename : "";
    const onlinetestPath = req.files['onlinetest'] ? "uploads/" + req.files['onlinetest'][0].filename : "";
    const markssheet10thPath = req.files['markssheet10th'] ? "uploads/" + req.files['markssheet10th'][0].filename : "";
    const markssheet12thPath = req.files['markssheet12th'] ? "uploads/" + req.files['markssheet12th'][0].filename : "";
    const degreeorbtechPath = req.files['degreeorbtech'] ? "uploads/" + req.files['degreeorbtech'][0].filename : "";
    const pancardPath = req.files['pancard'] ? "uploads/" + req.files['pancard'][0].filename : "";
    const aadharcardPath = req.files['aadharcard'] ? "uploads/" + req.files['aadharcard'][0].filename : "";
    const experiencelettersPath = req.files['experienceletters'] ? "uploads/" + req.files['experienceletters'][0].filename : "";


    const values = [
        category, candidatename, emailaddress, phonenumber, 
        hrmanager, examdate, location, fathername, mothername, 
        parentphonenumber, feedback1, feedback2, feedback3, resumePath,
        preofferletterPath, onlinetestPath, markssheet10thPath,
        markssheet12thPath, degreeorbtechPath, pancardPath, aadharcardPath,
        experiencelettersPath
     ]

    const sql = 'INSERT INTO  employeeonboarding (`category`, `candidatename`, `emailaddress`, `phonenumber`, `hrmanager`, `examdate`, `location`, `fathername`, `mothername`, `parentphonenumber`, `feedback1`, `feedback2`, `feedback3`, `resume`, `preofferletter`, `onlinetest`, `markssheet10th`, `markssheet12th`, `degreeorbtech`, `pancard`, `aadharcard`, `experienceletters`) VALUES (?)';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({ message: 'Application submitted successfully' });
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE

//UPDATE APPLICATIONS (RECRUITING & BENCH)
app.put('/update-form/:userId', upload.fields([
    { name: 'resumefilepath', maxCount: 1 },
    { name: 'r2rfilepath', maxCount: 1 },
    { name: 'drivinglisencefilepath', maxCount: 1 },
    { name: 'visacopyfilepath', maxCount: 1 },
    { name: 'msacopyfilepath', maxCount: 1 }
]), (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const {
        category, recruitername, recruiterid, submittiondate, candidatename,
        clientname, pocname, feedback, remarks, cname, cemail,
        cphone, cssn, cpassport, cdriving, cphoto
    } = req.body;

    const resumePath = req.files['resumefilepath'] ? "uploads/" + req.files['resumefilepath'][0].filename : req.body.resumefilepath;
    const r2rPath = req.files['r2rfilepath'] ? "uploads/" + req.files['r2rfilepath'][0].filename : req.body.r2rfilepath;
    const drivingPath = req.files['drivinglisencefilepath'] ? "uploads/" + req.files['drivinglisencefilepath'][0].filename : req.body.drivinglisencefilepath;
    const visaPath = req.files['visacopyfilepath'] ? "uploads/" + req.files['visacopyfilepath'][0].filename : req.body.visacopyfilepath;
    const msaPath = req.files['msacopyfilepath'] ? "uploads/" + req.files['msacopyfilepath'][0].filename : req.body.msacopyfilepath;

    console.log(resumePath);

    const values = [
        recruitername, category, recruiterid, candidatename,
        submittiondate, clientname, pocname, feedback, remarks, resumePath,
        r2rPath, drivingPath, visaPath, msaPath, cname, cemail,
        cphone, cssn, cpassport, cdriving, cphoto, userId // Add the ID as the last value
    ];

    const sql = `
        UPDATE applications 
        SET 
            recruitername = ?, 
            category = ?, 
            recruiterid = ?, 
            candidatename = ?, 
            submittiondate = ?, 
            clientname = ?, 
            pocname = ?, 
            feedback = ?, 
            remarks = ?, 
            resumefilepath = ?, 
            r2rfilepath = ?, 
            drivinglisencefilepath = ?, 
            visacopyfilepath = ?, 
            msacopyfilepath = ?, 
            cname = ?, 
            cemail = ?, 
            cphone = ?, 
            cssn = ?, 
            cpassport = ?, 
            cdriving = ?, 
            cphoto = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE HOTLISTAPPLICATION (HOTLIST)
app.put('/update-hotlist-application/:userId', upload.fields([
    { name: 'resumepath', maxCount: 1 },
    { name: 'r2rpath', maxCount: 1 },
    { name: 'drivingpath', maxCount: 1 },
    { name: 'visapath', maxCount: 1 },
]), (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, candidatename, email, phonenumber, technology, location, visastatus, remarks, resume } = req.body;

    const resumePath = req.files['resumepath'] ? "uploads/" + req.files['resumepath'][0].filename : req.body.resumepath;
    const r2rPath = req.files['r2rpath'] ? "uploads/" + req.files['r2rpath'][0].filename : req.body.r2rpath;
    const drivingPath = req.files['drivingpath'] ? "uploads/" + req.files['drivingpath'][0].filename : req.body.drivingpath;
    const visaPath = req.files['visapath'] ? "uploads/" + req.files['visapath'][0].filename : req.body.visapath;
    const values = [category, candidatename, email, phonenumber, technology, location, visastatus, remarks, resumePath, r2rPath, drivingPath, visaPath, userId];
    const sql = `
        UPDATE hotlistapplication
        SET 
            category = ?,
            candidatename = ?, 
            email = ?, 
            phonenumber = ?, 
            technology = ?, 
            location = ?, 
            visastatus = ?, 
            remarks = ?, 
            resumepath = ?, 
            r2rpath = ?, 
            drivingpath = ?, 
            visapath = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE PRIME (PRIME)
app.put('/update-prime-application/:userId', upload.fields([
    { name: 'msa', maxCount: 1 },
    { name: 'po', maxCount: 1 },
    { name: 'coi', maxCount: 1 },
]), (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, vendercompany, recruitername, phonenumber, email, faxnumber, companyaddress, branchlocation, notes } = req.body;

    const msaPath = req.files['msa'] ? "uploads/" + req.files['msa'][0].filename : req.body.resumepath;
    const poPath = req.files['po'] ? "uploads/" + req.files['po'][0].filename : req.body.r2rpath;
    const coiPath = req.files['coi'] ? "uploads/" + req.files['coi'][0].filename : req.body.drivingpath;
    const values = [category, vendercompany, recruitername, phonenumber, email, faxnumber, companyaddress, branchlocation, notes , msaPath, poPath, coiPath, userId];
    const sql = `
        UPDATE primevenders
        SET 
            category = ?,
            vendorcompany = ?, 
            recruitername = ?, 
            phonenumber = ?, 
            email = ?, 
            faxnumber = ?, 
            companyaddress = ?, 
            branchlocation = ?, 
            notes = ?,
            msapath = ?, 
            popath = ?, 
            coipath = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE JOBS (JOBS)
app.put('/update-jobs-application/:userId', (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, recruitmentdate, positiontitle, clientname, recruitername, location, jobdescription, notes } = req.body;
    const values = [category, recruitmentdate, positiontitle, clientname, recruitername, location, jobdescription, notes, userId];
    const sql = `
        UPDATE hotlistapplication
        SET 
            category = ?,
            recruitmentdate = ?, 
            positiontitle = ?, 
            clientname = ?, 
            recruitername = ?, 
            location = ?, 
            jobdescription = ?, 
            notes = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE CLIENTS (CLIENTS)
app.put('/update-clients-application/:userId', (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, clientname, clientwebsite, recruitername, recruiteremailid, recruitercontactnumber, jobportellink, notes } = req.body;
    const values = [category, clientname, clientwebsite, recruitername, recruiteremailid, recruitercontactnumber, jobportellink, notes, userId];
    const sql = `
        UPDATE clients
        SET 
            category = ?,
            clientname = ?, 
            clientwebsite = ?, 
            recruitername = ?, 
            recruiteremailid = ?, 
            recruitercontactnumber = ?, 
            jobportAllink = ?,
            notes = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE CANDIDATES (CANDIDATES)
app.put('/update-candidates-application/:userId', upload.fields([
    { name: 'resumepath', maxCount: 1 },
    { name: 'r2rpath', maxCount: 1 },
    { name: 'drivinglisencepath', maxCount: 1 },
    { name: 'visapath', maxCount: 1 },
]), (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, submissiondate, candidatename, emailid, phonenumber, positiontitle, visastatus, notes } = req.body;
    const resumePath = req.files['resumepath'] ? "uploads/" + req.files['resumepath'][0].filename : req.body.resumepath;
    const r2rPath = req.files['r2rpath'] ? "uploads/" + req.files['r2rpath'][0].filename : req.body.r2rpath;
    const drivingPath = req.files['drivinglisencepath'] ? "uploads/" + req.files['drivingpath'][0].filename : req.body.drivingpath;
    const visaPath = req.files['visapath'] ? "uploads/" + req.files['visapath'][0].filename : req.body.visapath;
    const values = [ category, submissiondate, candidatename, emailid, phonenumber, positiontitle, visastatus, notes, resumePath, r2rPath, drivingPath, visaPath, userId];
    const sql = `
        UPDATE candidates
        SET 
            category = ?,
            submissiondate = ?,
            candidatename = ?, 
            emailid = ?, 
            phonenumber = ?, 
            positiontitle = ?, 
            visastatus = ?, 
            notes = ?, 
            resumepath = ?, 
            r2rpath = ?, 
            drivinglicensepath = ?, 
            visapath = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE TRAINING (TRAINING)
app.put('/update-training-application/:userId', (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, enrollmentdate, candidatename, emailid, phonenumber, coursename, facultyname, notes } = req.body;
    const values = [category, enrollmentdate, candidatename, emailid, phonenumber, coursename, facultyname, notes, userId];
    const sql = `
        UPDATE training
        SET 
            category = ?,
            enrollmentdate = ?,
            candidatename = ?,
            emailid = ?,
            phonenumber = ?,
            coursename = ?,
            facultyname = ?,
            notes = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE INTERVIEW (INTERVIEW)
app.put('/update-interview-application/:userId', (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, interviewdate, recruitername, candidatename, technology, vendorrecruitername, vendorphonenumber, vendoremailid, endclient, interviewslot, interviewmode, position, billrate, feedback } = req.body;
    const values = [category, interviewdate, recruitername, candidatename, technology, vendorrecruitername, vendorphonenumber, vendoremailid, endclient, interviewslot, interviewmode, position, billrate, feedback, userId];
    const sql = `
        UPDATE interview
            SET 
                category = ?,
                interviewdate = ?,
                recruitername = ?,
                candidatename = ?,
                technology = ?,
                vendorrecruitername = ?,
                vendorphonenumber = ?,
                vendoremailid = ?,
                endclient = ?,
                interviewslot = ?,
                interviewmode = ?,
                position = ?,
                billrate = ?,
                feedback = ?
            WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

//UPDATE CANDIDATE ONBOARDING (CANDIDATE)
app.put('/update-candidate-onboarding-application/:userId', upload.fields([
    { name: 'passport', maxCount: 1 },
    { name: 'drivinglicense', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'i9', maxCount: 1 },
    { name: 'w4', maxCount: 1 },
    { name: 'bankahcform', maxCount: 1 },
    { name: 'adpform', maxCount: 1 },
    { name: 'medicalenrollmentform', maxCount: 1 },
    { name: 'experience', maxCount: 1 },
    { name: 'employeehandbook', maxCount: 1 },
    { name: 'offerletter', maxCount: 1 },

]), (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, candidatename, emailaddress, phonenumber, ssn } = req.body;
    const passportPath = req.files['passport'] ? "uploads/" + req.files['passport'][0].filename : req.body.passport;
    const drivingPath = req.files['drivinglicense'] ? "uploads/" + req.files['drivinglicense'][0].filename : req.body.drivinglicense;
    const photoPath = req.files['photo'] ? "uploads/" + req.files['photo'][0].filename :  req.body.photo;
    const i9Path = req.files['i9'] ? "uploads/" + req.files['i9'][0].filename :  req.body.i9;
    const w4Path = req.files['w4'] ? "uploads/" + req.files['w4'][0].filename :  req.body.w4;
    const bankahcformPath = req.files['bankahcform'] ? "uploads/" + req.files['bankahcform'][0].filename :  req.body.bankahcform;
    const adpformPath = req.files['adpform'] ? "uploads/" + req.files['adpform'][0].filename :  req.body.adpform;
    const medicalenrollmentformPath = req.files['medicalenrollmentform'] ? "uploads/" + req.files['medicalenrollmentform'][0].filename :  req.body.medicalenrollmentform;
    const experiencePath = req.files['experience'] ? "uploads/" + req.files['experience'][0].filename :  req.body.experience;
    const employeehandbookPath = req.files['employeehandbook'] ? "uploads/" + req.files['employeehandbook'][0].filename :  req.body.employeehandbook;
    const offerletterPath = req.files['offerletter'] ? "uploads/" + req.files['offerletter'][0].filename :  req.body.offerletter;
    const values = [ 
        category, candidatename, emailaddress, phonenumber, 
        ssn, passportPath, drivingPath, photoPath, i9Path,
        w4Path, bankahcformPath, adpformPath, medicalenrollmentformPath, 
        experiencePath, employeehandbookPath, offerletterPath, userId
    ];
    const sql = `
        UPDATE candidateonboarding
        SET 
            category = ?,
            candidatename = ?,
            emailaddress = ?,
            phonenumber = ?, 
            ssn = ?,
            passport = ?,
            drivinglicense = ?,
            photo = ?,
            i9 = ?,
            w4 = ?,
            bankahcform = ?,
            adpform = ?,
            medicalenrollmentform = ?, 
            experience = ?,
            employeehandbook = ?,
            offerletter = ?
        WHERE 
            id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
    
});

//UPDATE CANDIDATE ONBOARDING (CANDIDATE)
app.put('/update-employee-onboarding-application/:userId', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'preofferletter', maxCount: 1 },
    { name: 'onlinetest', maxCount: 1 },
    { name: 'markssheet10th', maxCount: 1 },
    { name: 'markssheet12th', maxCount: 1 },
    { name: 'degreeorbtech', maxCount: 1 },
    { name: 'pancard', maxCount: 1 },
    { name: 'aadharcard', maxCount: 1 },
    { name: 'experienceletters', maxCount: 1 },

]), (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { category, candidatename, emailaddress, phonenumber, hrmanager, examdate, location, fathername, mothername, parentphonenumber, feedback1, feedback2, feedback3, 
        resume,  preofferletter, onlinetest, markssheet10th, markssheet12th,  degreeorbtech, pancard, aadharcard, experienceletters} = req.body;
    const resumePath = req.files['resume'] ? "uploads/" + req.files['resume'][0].filename : resume;
    const preofferletterPath = req.files['preofferletter'] ? "uploads/" + req.files['preofferletter'][0].filename : preofferletter;
    const onlinetestPath = req.files['onlinetest'] ? "uploads/" + req.files['onlinetest'][0].filename : onlinetest;
    const markssheet10thPath = req.files['markssheet10th'] ? "uploads/" + req.files['markssheet10th'][0].filename : markssheet10th;
    const markssheet12thPath = req.files['markssheet12th'] ? "uploads/" + req.files['markssheet12th'][0].filename : markssheet12th;
    const degreeorbtechPath = req.files['degreeorbtech'] ? "uploads/" + req.files['degreeorbtech'][0].filename : degreeorbtech;
    const pancardPath = req.files['pancard'] ? "uploads/" + req.files['pancard'][0].filename : pancard;
    const aadharcardPath = req.files['aadharcard'] ? "uploads/" + req.files['aadharcard'][0].filename : aadharcard;
    const experiencelettersPath = req.files['experienceletters'] ? "uploads/" + req.files['experienceletters'][0].filename : experienceletters;
    const values = [ 
        category, candidatename, emailaddress, phonenumber, 
        hrmanager, examdate, location, fathername, mothername, 
        parentphonenumber, feedback1, feedback2, feedback3, resumePath,
        preofferletterPath, onlinetestPath, markssheet10thPath,
        markssheet12thPath, degreeorbtechPath, pancardPath, aadharcardPath,
        experiencelettersPath, userId
    ];
    const sql = `
        UPDATE employeeonboarding
        SET 
            category = ?,
            candidatename = ?,
            emailaddress = ?, 
            phonenumber = ?, 
            hrmanager = ?, 
            examdate = ?, 
            location = ?, 
            fathername = ?, 
            mothername = ?, 
            parentphonenumber = ?, 
            feedback1 = ?, 
            feedback2 = ?, 
            feedback3 = ?, 
            resume = ?,
            preofferletter = ?, 
            onlinetest = ?, 
            markssheet10th = ?,
            markssheet12th = ?, 
            degreeorbtech = ?, 
            pancard = ?, 
            aadharcard = ?,
            experienceletters = ?
        WHERE 
            id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
    
});


//UPDATE USERDATA (STAFF USER)
app.put('/update-user-form/:userId', (req, res) => {
    const { userId } = req.params; // Extract the ID from the URL
    const { username, email, password, usertype } = req.body;
    const values = [username, email, password, usertype, userId];
    console.log(username, email, password, usertype);
    const sql = `
        UPDATE userdata 
        SET 
            username = ?, 
            email = ?, 
            password = ?, 
            usertype = ?
        WHERE id = ?`; // Update query with placeholders for values

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Data updated successfully');
        res.status(200).json({ message: 'Data updated successfully' });
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE

// DELETE FROM APPLICATIONS (RECRUITING & BENCH)
app.delete('/delete-user/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM applications WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM HOTLISTAPPLICATION (HOTLIST USER)
app.delete('/delete-hotlist/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM hotlistapplication WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM  JOBS (JOBS USER)
app.delete('/delete-jobs/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM jobs WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM PRIME (PRIME USER)
app.delete('/delete-prime/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM primevenders WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM  CLIENTS (CLIENTS USER)
app.delete('/delete-clients/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM clients WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM CANDIDATES (CANDIDATES USER)
app.delete('/delete-candidates/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM candidates WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM TRAINING (TRAINING USER)
app.delete('/delete-training/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM training WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM INTERVIEW (INTERVIEW USER)
app.delete('/delete-interview/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM interview WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM CANDIDATE ONBOARDING (CANDIDATEONBOARDING USER)
app.delete('/delete-candidate-onboarding/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM candidateonboarding WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM EMPLOYEE ONBOARDING (EMPLOYEEONBOARDING USER)
app.delete('/delete-employee-onboarding/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM employeeonboarding WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

// DELETE FROM USERDATA (STAFF USER)
app.delete('/delete-company-user/:userId', (req, res) => {
    const userId = req.params.userId
    const sql = "DELETE FROM userdata WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) return (err)
        return res.json("User Deleted Successfully")
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TRASHBIN

//GET DATA FROM TRASHBIN
app.get('/trashbin', (req, res) => {
    const sql = "SELECT * FROM trashbin"
    db.query(sql, (err, data) => {
        if(err) return res.status(500).json({error: err})
        return res.json(data)
    })
})

//POST TO TRASHBIN (DELETED DATA)
app.post('/trashbin', (req, res) => {
    const application = req.body;
    const dbAppData = JSON.stringify(application); // Optionally stringify the data
    const sql = "INSERT INTO trashbin (`trasheddata`) VALUES (?)";
    db.query(sql, [dbAppData], (err, data) => {
        if (err) {
            console.error("Error inserting data into trashbin:", err);
            return res.status(500).json(err);
        }
        console.log("Successfully inserted into trashbin");
        return res.json("Successfully Inserted into trashbin");
    });
});

app.post('/trashbin-to', (req, res) => {
    const reqObj = req.body
    delete reqObj.id
    let tablename
    if (reqObj.category === "Recruiting"){
        tablename = "applications"
    }else if(reqObj.category === "Bench"){
        tablename = "applications"
    }
    const sql = `INSERT INTO ${tablename !== undefined ? tablename : reqObj.category.charAt(0).toLowerCase() + reqObj.category.slice(1)} 
    (${Object.keys(reqObj).map(each => each )}) VALUES (?)`
    console.log(sql);
    const values = Object.values(reqObj)
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(`Error inserting data ${reqObj.category}`, err);
            return res.status(500).json(err);
        }
        console.log("Successfully inserted into trashbin");
        return res.json(`Successfully Inserted into ${reqObj.category}`);
    });
})

// DELETE FROM TRASHBIN (SRASHBIN USER)
app.delete('/delete-trashbin/:appId', (req, res) => {
    const userId = req.params.appId
    const sql = "DELETE FROM trashbin WHERE id = ?"
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "An error occurred while deleting user" });
        }
        return res.json("User Deleted Successfully");
    });
});

// DELETE ALL FROM TRASHBIN (SRASHBIN USER)
app.delete('/delete-trashbin-all', (req, res) => {
    const sql = "DELETE FROM trashbin";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error deleting entries from trashbin:", err);
            return res.status(500).json({ error: "An error occurred while deleting entries from trashbin" });
        }
        return res.json("All entries deleted from trashbin successfully");
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER RUNNING STATUS
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
