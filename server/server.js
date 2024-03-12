import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";
import Jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";
import nodemailer from 'nodemailer';
import Randomstring from "randomstring";
require('dotenv').config();


const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["POST", "GET", "PUT"],
    credentials : true
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret : 'secret', //a secret keyword used to encrypt the session cookie
    resave: false,
    saveUninitialized : false,
    cookie : {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "bidgalaxy"
});

const SMTP_MAIL = process.env.SMTP_MAIL;
const SMTP_PASS = process.env.SMTP_PASS;

const sendMail = async(email, mailSubject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            secure: false,
            requireTLS: true,
            auth: {
              user: SMTP_MAIL,
              pass: SMTP_PASS
            }
        });

        const mailOption1 = {
            from: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: content
        }

        // const mailOption2 = {
        //     from: email,
        //     to: SMTP_MAIL,
        //     subject: mailSubject,
        //     html: content
        // }

        transporter.sendMail(mailOption1, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail sent Successfully : ", info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

//sending userId of admin using session
app.get('/admin/Sidebar', (req, res) => {
    if(req.session.userId) {
        return res.json({valid : true, userId : req.session.userId})
    } else {
        return res.json({valid : false})
    }
})

//Sending userId of user using session
app.get('/user/Sidebar', (req, res) => {
    if(req.session.userId) {
        return res.json({valid : true, userId : req.session.userId})
    } else {
        return res.json({valid : false})
    }
})

//Sending user_id of user on registration using session
// app.get('/signup/ProfileSection', (req, res) => {
//     if(req.session.userId) {
//         return res.json({valid : true, userId : req.session.userId})
//     } else {
//         return res.json({valid : false})
//     }
// });

app.post('/signup/index', (req, res) => {
    // Check if username already exists
    const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUsernameQuery, [req.body.username], (err, usernameData) => {
        if (err) {
            console.error("Error while checking existing username:", err);
            return res.json({ Error: "Error while checking existing username" });
        }
        if (usernameData.length > 0) {
            return res.json({ Error: "Username already exists" });
        } else {
            const checkEmailQuery = "SELECT * FROM users WHERE email_address = ?";
            db.query(checkEmailQuery, [req.body.email], (err, emailData) => {
                if (err) {
                    return res.json({ Error: "Error while checking existing email address" });
                }
                if (emailData.length > 0) {
                    return res.json({ Error: "Email address already exists" });
                } else {
                    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
                        if (err) return res.json({ Error: "Error for hashing password" });

                        const randomToken = Randomstring.generate();
                        
                        //Insert into users table
                        const insertUserQuery = "INSERT INTO users (username, email_address, password, token) VALUES (?, ?, ?, ?)";
                        const values = [req.body.username, req.body.email, hash, randomToken];
                        
                        db.query(insertUserQuery, values, (err, result) => {
                            if (err) return res.json({ Error: "Error while registering. Please try again later." });

                            //Retrieving the last inserted user_id
                            const user_id = result.insertId;
                            // Insert into user_details table
                            const insertUserDetailsQuery = "INSERT INTO user_details (user_id, email_address) VALUES (?, ?)";
                            const userDetailsValues = [user_id, req.body.email];
                            db.query(insertUserDetailsQuery, userDetailsValues, (err) => {
                                if (err) return res.json({ Error: "Error while inserting user details" });

                                let mailSubject = "Email Verification";
                                let content = '<p>Hello '+req.body.username+', Please verify your email by clicking <a href="http://localhost:3000/signup/ProfileSection?q='+randomToken+'&r='+user_id+'">here</a>.</p>';
                                sendMail(req.body.email, mailSubject, content)

                                // req.session.userId = user_id;

                                // console.log(user_id);

                                return res.json({ Status: "Success" });
                            });
                        });
                    });
                }
            });
        }
    });
});

app.post('/signin/index', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if(err) {
            return res.json({ Error: "Error while Login" });
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.json({ Error: "Error while comparing passwords" });
                }
                if(response) {
                    const userId = data[0].user_id;
                    req.session.userId = userId;
                    const token = Jwt.sign({userId}, "jwt-secret-key", {expiresIn : '1d'});
                    res.cookie('token', token);
                    const role = data[0].role;
                    return res.json({ Status: "Success", Role: role });
                } else {
                    return res.json({ Error: "Wrong Password!" });
                }
            });
        } else {
            return res.json({ Error: "Invalid Username or Password" });
        }
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.json({ Error: "Error while logging out" });
        } else {
            return res.json({ Status: "Success" });
        }
    });
})

//Fetching the admin related data from user table for admin dashboard using session
app.get('/admin/details/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error("Error fetching user details:", err);
            return res.status(500).json({ Error: "Error fetching user details" });
        }
        if (data.length === 0) {
            return res.status(404).json({ Error: "User not found" });
        }
        const userDetails = data[0]; // Assuming the query returns only one user
        return res.json(userDetails);
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/assets/auctionItemImages/');
    },
    filename: function (req, file, cb) {
        // Use the original filename provided by the client
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/admin/PlaceItem', upload.fields([
    { name: 'product_image1', maxCount: 1 },
    { name: 'product_image2', maxCount: 1 },
    { name: 'product_image3', maxCount: 1 },
    { name: 'product_image4', maxCount: 1 },
    { name: 'artist_profile_url', maxCount: 1 }
]), (req, res) => {
    const formData = req.body;

    formData.product_image1 = req.files['product_image1'][0].path;
    formData.product_image2 = req.files['product_image2'][0].path;
    formData.product_image3 = req.files['product_image3'][0].path;
    formData.product_image4 = req.files['product_image4'][0].path;
    formData.artist_profile_url = req.files['artist_profile_url'][0].path;

    db.query('INSERT INTO products SET ?', formData, (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ error: 'An error occurred while inserting data into the database' });
        return;
      }
      console.log('Data inserted to Database Successfully!');
      res.status(200).json({ success: true });
    });
  });

//Get all the users
app.get('/admin/Users', (req, res) => {
    const query = 'SELECT * FROM users WHERE role = ?';
    db.query(query, ['user'], (err, data) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            if (data.length === 0) {
                console.error('No users found with role "user"');
                return res.status(404).json({ Error: "User not found" });
            } else {
                return res.json(data);
            }
        }
    });
});

//Fetching the user details using user_id in the url
app.get('/admin/UserDetails/:userId', (req, res) => {
    const userId = req.params.userId;

    // Example: Query the database to get user details based on user ID
    db.query('SELECT * FROM user_details WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const userDetails = results[0]; // Assuming only one user will be returned
                res.json(userDetails);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

//Get all the Auction items
app.get('/admin/AuctionItems', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const query = "SELECT * FROM products WHERE deleted = '0' AND auction_date > ?";
    db.query(query, [currentDate], (err, data) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        } else {
            if (data.length === 0) {
                console.error('No product records found');
                return res.status(404).json({ error: "No products found" });
            } else {
                return res.json(data);
            }
        }
    });
});

//Fetching auction item details details using id in the url
app.get('/admin/AuctionItemDetails/:id', (req, res) => {
    const id = req.params.id;

    // Example: Query the database to get user details based on user ID
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const itemDetails = results[0]; // Assuming only one user will be returned
                res.json(itemDetails);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

// Here we are trying to update the disabled column of products table to 0 or 1 according to the button click
app.put('/admin/AuctionItems/EnableDisable/:id', (req, res) => {
    const { id } = req.params;
    const { disabled } = req.body;

    // Ensure that the value of disabled is either 0 or 1
    if (disabled !== '0' && disabled !== '1') {
        console.log('Invalid value for disabled column');
        return res.status(400).json({ error: 'Invalid value for disabled column' });
    }
    const query = 'UPDATE products SET disabled = ?, modified_timestamp = NOW() WHERE id = ?';
    db.query(query, [disabled, id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Error updating product' });
        }
        // console.log('Product updated successfully');
        res.sendStatus(200);
    });
});

//Here we are trying to delete a product
app.put('/admin/AuctionItems/Delete/:id', (req, res) => {
    const { id } = req.params;
    // const { disabled } = req.body;

    const query = 'UPDATE products SET deleted = ?, deleted_timestamp = NOW() WHERE id = ?';
    db.query(query, ['1', id], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Error updating product' });
        }
        // console.log('Product updated successfully');
        res.sendStatus(200);
    });
});

// Get all auctioned Items
app.get('/admin/AuctionedItems', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const query = "SELECT * FROM products WHERE deleted = '0' AND auction_date < ?";
    db.query(query, [currentDate], (err, data) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Error fetching products' });
        } else {
            if (data.length === 0) {
                console.error('No product records found');
                return res.status(404).json({ error: "No products found" });
            } else {
                return res.json(data);
            }
        }
    });
});

app.post('/admin/BuyerDetails', (req, res) => {
    const formData = req.body;
    const productId = parseInt(formData.product_id);
    formData.product_id = Number.isNaN(productId) ? null : productId;

    db.query('INSERT INTO sold_products SET ?', formData, (err, result) => {
        if (err) {
          console.error('Error inserting data into the database:', err);
          res.status(500).json({ error: 'An error occurred while inserting data into the database' });
          return;
        }
        console.log('Data inserted to Database Successfully!');
        res.status(200).json({ success: true });
    });
})

//We are getting auctioned item details
app.get('/admin/AuctionedItemDetails/:id', (req, res) => {
    const id = req.params.id;

    // Example: Query the database to get user details based on user ID
    db.query('SELECT * FROM sold_products WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const itemDetails = results[0]; // Assuming only one user will be returned
                res.json(itemDetails);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

// We are getting the total count of users
app.get('/admin/users/count', (req, res) => {
    db.query('SELECT COUNT(*) AS count FROM users', (err, result) => {
      if (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ error: 'An error occurred while fetching user count' });
        return;
      }
      const count = result[0].count;
      res.status(200).json({ count });
    });
});

//We are getting total count of products
app.get('/admin/products/count', (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM products WHERE deleted = '0'", (err, result) => {
      if (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ error: 'An error occurred while fetching user count' });
        return;
      }
      const count = result[0].count;
      res.status(200).json({ count });
    });
});

//We are getting total count of sold products
app.get('/admin/soldproducts/count', (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM sold_products", (err, result) => {
      if (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ error: 'An error occurred while fetching user count' });
        return;
      }
      const count = result[0].count;
      res.status(200).json({ count });
    });
});

//Fetching the user related data from user table for user dashboard using session
app.get('/user/details/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.error("Error fetching user details:", err);
            return res.status(500).json({ Error: "Error fetching user details" });
        }
        if (data.length === 0) {
            return res.status(404).json({ Error: "User not found" });
        }
        const userDetails = data[0]; // Assuming the query returns only one user
        return res.json(userDetails);
    });
});

//Profile update of user
app.put('/user/Profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const formData = req.body;

    const query = 'UPDATE user_details SET first_name = ?, middle_name = ?, last_name = ?, contact_number = ?, gender = ?, street_address1 = ?, street_address2 = ?, city = ?, state = ?, postal_code = ?, country = ?, modified_timestamp = NOW() WHERE user_id = ?';

    db.query(query, [formData.first_name, formData.middle_name, formData.last_name, formData.contact_number, formData.gender, formData.street_address1, formData.street_address2, formData.city, formData.state, formData.postal_code, formData.country, userId], (err, result) => {
        if (err) {
            console.error('Error updating user profile:', err);
            return res.status(500).json({ error: 'Error updating user profile' });
        }
        console.log('User profile updated successfully');
        res.sendStatus(200);
    });
});

app.get('/user/ProfileDetails/:userId', (req, res) => {
    const userId = req.params.userId;
})

app.listen(8081, () => {
    console.log("Server is Running...");
})