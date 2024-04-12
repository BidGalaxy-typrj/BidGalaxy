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
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';


const salt = 10;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
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

dotenv.config();

const smtp_mail = process.env.SMTP_MAIL;
const smtp_pass = process.env.SMTP_PASS;

const sendMail = async(email, mailSubject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            secure: false,
            requireTLS: true,
            auth: {
              user: smtp_mail,
              pass: smtp_pass
            }
        });

        const mailOption1 = {
            from: smtp_mail,
            to: email,
            subject: mailSubject,
            html: content
        }

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

const sendMailToAdmin = async(email, mailSubject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            secure: false,
            requireTLS: true,
            auth: {
              user: smtp_mail,
              pass: smtp_pass
            }
        });

        const mailOption1 = {
            from: email,
            to: smtp_mail,
            subject: mailSubject,
            html: content
        }

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

                            let mailSubject = "Email Verification";
                            let content = '<p>Hello '+req.body.username+', Please verify your email by clicking <a href="http://localhost:3000/signup/ProfileSection?q='+randomToken+'&r='+user_id+'">here</a>.</p>';
                            sendMail(req.body.email, mailSubject, content);

                            // Insert into user_details table
                            const insertUserDetailsQuery = "INSERT INTO user_details (user_id, email_address) VALUES (?, ?)";
                            const userDetailsValues = [user_id, req.body.email];
                            db.query(insertUserDetailsQuery, userDetailsValues, (err) => {
                                if (err) return res.json({ Error: "Error while inserting user details" });

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
    const sql = "SELECT * FROM users WHERE BINARY username = ?";
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

app.post('/reset_password/ResetPassword', (req, res) => {
    const sql = "SELECT * FROM users WHERE email_address = ?";
    db.query(sql, [req.body.email_address], (err, data) => {
        if(err) {
            console.error("Error while Checking:", err);
            return res.status(500).json({ Error: "Error while checking email address" });
        }
        // console.log(data);
        if (data.length === 0) {
            console.log("No such email found");
            return res.status(200).json({ Error: "No such email found" });
        }
        if (data.length > 0) {
            const username = data[0].username;
            const email = req.body.email_address;
            const token = data[0].token;
            const user_id = data[0].user_id;
            let mailSubject = "Reset Password";
            let content = '<p>Hello '+username+', You can change your password by clicking <a href="http://localhost:3000/reset_password/ChangePassword?q='+token+'&r='+user_id+'">here</a>.</p>';
            sendMail(email, mailSubject, content);
            res.sendStatus(200);
        } else {
            return res.json({ Error: "This Email address is not available." });
        }
    });
});

app.put('/reset_password/ChangePassword/:userId', (req, res) => {
    const userId = req.params.userId;

    bcrypt.hash(req.body.new_password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing password" });

        const sql = "UPDATE users SET password = ? WHERE user_id = ?";

        db.query(sql, [hash, userId], (err, result) => {
            if(err){
                return res.json({ Error: "Error while updating the password." });
            }
            return res.json({ Status: "Success" });
        })
    })
})

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

//Storage and directory declaration for product image to be stored
const storageForProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/assets/auctionItemImages/');
    },
    filename: function (req, file, cb) {
        // Use the original filename provided by the client
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storageForProduct });

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
            if (results.length === 0) {
                return res.status(200).json({ error: 'User not found' });
            }
            else {
                const userDetails = results[0]; // Assuming only one user will be returned
                res.json(userDetails);
            }
        }
    });
});

// We are getting the total count of users
app.get('/admin/users/count', (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM users WHERE username <> 'Admin'", (err, result) => {
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
        console.error('Error fetching product count:', err);
        res.status(500).json({ error: 'An error occurred while fetching product count' });
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
        console.error('Error fetching sold_products count:', err);
        res.status(500).json({ error: 'An error occurred while fetching sold_products count' });
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

// app.get('/user/upcomingBids/:userId',(req,res)=>{
//     const userId = req.params.userId;
//     const sql = "SELECT * FROM product_registration WHERE user_id = ?";
//     db.query(sql,[userId],(err,data)=>{
//         if(err){
//             console.log("Error fetching product Ids",err);
//             return res.status(500).json({Error:"Error in Fetching product Ids"});
//         }
//         if(data.length === 0){
//             return res.status(404).json({Error:"Product Not Found"});
//         }
//         const productIds = data[0];
//         return res.json(productIds);
//     });
// });

//Profile update of user at register
app.put('/user/Profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const formData = req.body;
    // console.log(formData);

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

//Fetching data from user_details table
app.get('/user/user_details/:userId', (req, res) => {
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
                res.status(200).json({ error: 'User not found' });
            }
        }
    });
});
//Fetching items of particular category
app.get('/home/artItems/:category',(req,res)=>{
    const category = req.params.category;
    db.query('SELECT * FROM products WHERE type = ? AND auction_date > NOW()',[category],(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"Internal Server Error"});
        }
        else{
            if(result.length > 0){
                let artItems = [];
                for(let i=0; i<result.length; i++){
                    artItems.push(result[i]);
                }
                res.json(artItems);
            }
            else{
                res.status(404).json({error:"Items not Found"});
            }
        }
    });
});

//Storage and directory declaration for product image to be stored
const storageForUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/assets/userProfile/');
    },
    filename: function (req, file, cb) {
        // Use the original filename provided by the client
        cb(null, file.originalname);
    }
});

const uploadProfileImage = multer({ storage: storageForUser });

//Updating user profile in user section
app.put('/user/user_profile/:userId', uploadProfileImage.fields([{ name: 'profile_url', maxCount: 1 }]), (req, res) => {
    const userId = req.params.userId;
    const formData = req.body;

    // Fetch user details from the database
    db.query('SELECT * FROM user_details WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ error: 'Error fetching user details' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userDetails = result[0];

        // Initialize an object to store the updated fields
        const updatedFields = {};

        // Iterate over the keys in formData to check for modified fields
        Object.keys(formData).forEach(key => {
            // Check if the key exists in userDetails
            if (userDetails.hasOwnProperty(key)) {
                // If the value is different, update the field
                if (userDetails[key] !== formData[key]) {
                    updatedFields[key] = formData[key];
                }
            }
        });

        // If profile_url is provided, update it in the database
        if (req.files['profile_url'] && req.files['profile_url'][0].path) {
            updatedFields['profile_url'] = req.files['profile_url'][0].path;
        }

        // If there are updated fields, construct the SQL query dynamically
        if (Object.keys(updatedFields).length > 0) {
            let query = 'UPDATE user_details SET ';
            const values = [];

            Object.keys(updatedFields).forEach((key, index) => {
                query += `${key} = ?, `;
                values.push(updatedFields[key]);
            });

            // Remove the trailing comma and space from the query
            query = query.slice(0, -2);

            query += ' WHERE user_id = ?';
            values.push(userId);

            // Execute the SQL query with the updated values
            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error updating user profile:', err);
                    return res.status(500).json({ error: 'Error updating user profile' });
                }
                console.log('User profile updated successfully');
                res.sendStatus(200);
            });
        } else {
            // If no fields are modified, send a response indicating no changes were made
            console.log('No fields to update');
            res.status(200).json({ message: 'No fields to update' });
        }
    });
});

//Razorpay integration for registering for an item
app.post('/create/orderId', async (req, res) => {

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_ID_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if(!order) {
            return res.status(500).send("Error");
        }

        res.status(200).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

//To check whether the transaction is valid or not
app.post('/order/validate', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }

        // Validation successful, send success response
        return res.status(200).json({
            msg: "Success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id
        });
    } catch (error) {
        console.error("Error validating payment:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

//Product Registration by user data insertion into table
app.post('/user/product_registration/:productId/:userId', (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    // Fetch user email and name from the users table
    const userQuery = "SELECT email_address, username FROM users WHERE user_id = ?";
    db.query(userQuery, [userId], (userErr, userResult) => {
        if (userErr) {
            console.error('Error while fetching user information:', userErr);
            return res.status(500).json({ error: 'Error while fetching user information. Try again later.' });
        }

        if (userResult.length === 0) {
            console.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const userEmail = userResult[0].email_address;
        const userName = userResult[0].username;

        // Fetch product title and artist name from the products table
        const productQuery = "SELECT title, artist_name FROM products WHERE id = ?";
        db.query(productQuery, [productId], (productErr, productResult) => {
            if (productErr) {
                console.error('Error while fetching product information:', productErr);
                return res.status(500).json({ error: 'Error while fetching product information. Try again later.' });
            }

            if (productResult.length === 0) {
                console.error('Product not found');
                return res.status(404).json({ error: 'Product not found' });
            }

            const productTitle = productResult[0].title;
            const artistName = productResult[0].artist_name;

            // Construct email content
            const mailSubject = "Product Registration Successful!";
            const content = `<h3>Dear ${userName},</h3>\n\nYou have successfully registered for <b>${productTitle}</b> by <b>${artistName}</b>.\n\nThank you for registering.<br/>You will receive a confirmation mail containing the meeting link and details within 1 to 2 working days.<br/>Best regards,<br/><b>BidGalaxy Team.</b>`;

            // Insert into product_registration table
            const registrationQuery = "INSERT INTO product_registration (product_id, user_id) VALUES (?, ?)";
            db.query(registrationQuery, [productId, userId], (regErr, regResult) => {
                if (regErr) {
                    console.error('Error while registering product:', regErr);
                    return res.status(500).json({ error: 'Error while registering product. Try again later.' });
                }

                console.log('Product registered successfully');

                // Send email
                sendMail(userEmail, mailSubject, content)
                    .then(() => {
                        res.sendStatus(200);
                    })
                    .catch((mailErr) => {
                        console.error('Error while sending email:', mailErr);
                        res.status(500).json({ error: 'Error while sending email. Try again later.' });
                    });
            });
        });
    });
});

//getting product based on user_id
app.get('/user/product_details/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT product_id FROM product_registration WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error while fetching product_ids:', err);
            return res.status(500).json({ error: 'Error while fetching product ids. Try again later.' });
        }

        if (results.length === 0) {
            console.error('No product ids found for the user');
            return res.status(200).json({ error: 'No products found for the user' });
        }

        const productIds = results.map(result => result.product_id);

        const productQuery = "SELECT * FROM products WHERE id IN (?) AND auction_date > NOW()";
        db.query(productQuery, [productIds], (productErr, productResults) => {
            if (productErr) {
                console.error('Error while fetching product information:', productErr);
                return res.status(500).json({ error: 'Error while fetching product information. Try again later.' });
            }

            if (productResults.length === 0) {
                console.error('No products found with the given product_ids');
                return res.status(200).json({ error: 'No products found with the given product_ids' });
            }

            // console.log(productResults);

            res.json(productResults);
        });
    });
});

//getting unique product_ids and respective user_ids from registered product
app.get('/admin/bidding_list', (req, res) => {
    const query = "SELECT DISTINCT product_id FROM product_registration";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error while fetching product IDs:', err);
            return res.status(500).json({ error: 'Error while fetching product IDs. Try again later.' });
        }

        if (results.length === 0) {
            console.error('No product IDs found');
            return res.status(404).json({ error: 'No products found' });
        }

        const productDetailsPromises = results.map(result => {
            const productId = result.product_id;
            const usersQuery = "SELECT user_id FROM product_registration WHERE product_id = ?";
            return new Promise((resolve, reject) => {
                db.query(usersQuery, [productId], (err, userResults) => {
                    if (err) {
                        console.error(`Error while fetching user IDs for product ID ${productId}:`, err);
                        reject(err);
                    } else {
                        const users = userResults.map(user => user.user_id);
                        resolve({ productId, users });
                    }
                });
            });
        });

        Promise.all(productDetailsPromises)
            .then(productDetails => {
                res.json(productDetails);
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
    });
});

//Getting product details of registered product by using product_id
app.post('/admin/bidItemDetails', (req, res) => {
    const productIds = req.body.productIds;
  
    // Query to fetch product details based on product IDs
    const query = `SELECT * FROM products WHERE id IN (${productIds.join(',')})`;
  
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching product details:', err);
        return res.status(500).json({ error: 'Error fetching product details' });
      }
  
      // Send the product details back to the client
      res.json(results);
    });
});

//Getting user_id using the product_id
app.get('/admin/bidItemDetails/users/:productId', (req, res) => {
    const productId = req.params.productId;

    // Query to fetch user IDs based on product ID
    const query = "SELECT user_id FROM product_registration WHERE product_id = ?";
    
    // Execute the query
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching user IDs:', err);
            return res.status(500).json({ error: 'Error fetching user IDs' });
        }

        // Extract user IDs from the results
        const userIds = results.map(result => result.user_id);
        res.json(userIds);
    });
});

//Get registerd user details using user_ids
app.post('/admin/bidUserDetails', (req, res) => {
    const userIds = req.body.userIds;

    // Check if userIds array is empty
    if (userIds.length === 0) {
        return res.status(400).json({ error: 'No user IDs provided' });
    }

    // Query to fetch product details based on product IDs
    const query = `SELECT * FROM user_details WHERE user_id IN (${userIds.join(',')})`;

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error while fetching user details:', err);
            return res.status(500).json({ error: 'Error fetching user details' });
        }

        // Send the product details back to the client
        res.json(results);
    });
});

//Sending meeting link through mail to registered users
app.post('/admin/sendMail', (req, res) => {
    const { user_id, first_name, email_address, link, productId, productName, artistName } = req.body;
  
    const mailSubject = 'Registration Confirmation!';
    const mailContent = `
      <h4>Hello ${first_name},</h4>
      <p>Your registration for the product ${productName} by the artist ${artistName} has been successfully verified.
      You can join the auction by clicking the following link:</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you have any questions or concerns about the auction, please contact us.</p>
      <p>See you at the auction!</p>
      <p><bold>BidGalaxy Team</bold></p>
    `;
  
    sendMail(email_address, mailSubject, mailContent)
      .then(() => {
        const query = "UPDATE product_registration SET meeting_link = ? WHERE user_id = ? AND product_id = ?";
        db.query(query, [link, user_id, productId], (err, result) => {
            if (err) {
                console.error('Error while updating meeting link:', err);
                return res.status(500).json({ error: 'Error in meeting link updation.' });
            }
            res.sendStatus(200);
        })
      })
      .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    });
  });

  app.get('/user/ongoing_bids/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT pr.product_id, pr.meeting_link FROM product_registration pr WHERE pr.user_id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error while fetching product_ids:', err);
            return res.status(500).json({ error: 'Error while fetching product ids. Try again later.' });
        }

        if (results.length === 0) {
            console.error('No product ids found for the user');
            return res.status(200).json({ error: 'No products found for the user' });
        }

        const productIds = results.map(result => result.product_id);
        const meetingLinks = results.reduce((acc, curr) => {
            acc[curr.product_id] = curr.meeting_link;
            return acc;
        }, {});

        const productQuery = "SELECT * FROM products WHERE id IN (?) AND auction_date = CURDATE()";
        db.query(productQuery, [productIds], (productErr, productResults) => {
            if (productErr) {
                console.error('Error while fetching product information:', productErr);
                return res.status(500).json({ error: 'Error while fetching product information. Try again later.' });
            }

            if (productResults.length === 0) {
                // console.error('No products found with the given product_ids');
                return res.status(200).json({ error: 'No products found with the given product_ids for this user' });
            }

            // Merge product details with meeting links
            const productsWithLinks = productResults.map(product => ({
                ...product,
                meeting_link: meetingLinks[product.id] || null
            }));

            res.json(productsWithLinks);
            // console.log(productsWithLinks);
        });
    });
});

//ContactUs
app.post('/contact', (req, res) => {
    const sql = "INSERT INTO user_queries (name, email_address, contact_number, description) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email_address, req.body.contact_number, req.body.description];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error while sending the query:', productErr);
            return res.status(500).json({ error: 'Error while sending query. Try again later.' });
        }
            let mailSubject = "User Query";
            let content = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>User Query</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    line-height: 1.6;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    border: 1px solid #ccc;
                                    border-radius: 5px;
                                    background-color: #f9f9f9;
                                }
                                h1 {
                                    color: #333;
                                }
                                p {
                                    margin-bottom: 15px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>User Query</h1>
                                <p>Hello Admin,</p>
                                <p>A new query has been submitted by a user:</p>
                                <hr>
                                <p><strong>Query Details:</strong></p>
                                <ul>
                                    <li><strong>Name: </strong>`+req.body.name+`</li>
                                    <li><strong>Email: </strong>`+req.body.email_address+`</li>
                                    <li><strong>Subject: </strong>`+req.body.description+`</li>
                                </ul>
                            </div>
                        </body>
                        </html>
                        `;
            sendMailToAdmin(req.body.email_address, mailSubject, content);
            return res.json({ Status: "Success" });
    })
})

//Getting total number of user queries
app.get('/admin/queries/count', (req, res) => {
    db.query("SELECT COUNT(*) AS count FROM user_queries", (err, result) => {
      if (err) {
        console.error('Error fetching user_queries count:', err);
        res.status(500).json({ error: 'An error occurred while fetching user_queries count' });
        return;
      }
      const count = result[0].count;
      res.status(200).json({ count });
    });
});

//Getting Bidding history of a user
app.get('/user/bidding_history/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT email_address FROM users WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {

        if (err) {
            console.error("Can't get email_address");
            return res.status(500).json({ error: 'No email address fetched using this user_id' });
        }

        const emailAddress = results[0].email_address;

        const productQuery = "SELECT product_id, final_price from sold_products WHERE buyer_email = ?";
        db.query(productQuery, [emailAddress], (productErr, productResults) => {
            if (productErr) {
                console.error('Error while fetching registered product Ids:', err);
                return res.status(500).json({ error: 'Error while fetching registered product ids. Try again later.' });
            }

            if (productResults.length === 0) {
                console.error('No product ids found for the user');
                return res.status(200).json({ error: 'No products found with that user_id' });
            }

            const productIds = productResults.map(productResult => productResult.product_id);
            const finalPrices = productResults.reduce((acc, curr) => {
                acc[curr.product_id] = curr.final_price;
                return acc;
            }, {});

            const productDetailsQuery = "SELECT * FROM products WHERE id IN (?)";
            db.query(productDetailsQuery, [productIds], (productDetailsErr, productDetailsResults) => {
                if (productDetailsErr) {
                    console.error('Error while fetching product information:', productDetailsErr);
                    return res.status(500).json({ error: 'Error while fetching product information. Try again later.' });
                }

                if (productDetailsResults.length === 0) {
                    // console.error('No products found with the given product_ids');
                    return res.status(200).json({ error: 'No products found with the given email_address of this user' });
                }

                // Merge product details with meeting links
                const productsWithPrices = productDetailsResults.map(product => ({
                    ...product,
                    final_price: finalPrices[product.id] || null
                }));

                res.json(productsWithPrices);
            });
        });
    });
});

app.get('/user/bids/count/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query("SELECT COUNT(*) AS count FROM product_registration WHERE user_id = ?", [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user_queries count:', err);
        res.status(500).json({ error: 'An error occurred while fetching user_queries count' });
        return;
      }
      const count = result[0].count;
      res.status(200).json({ count });
    });
});

app.get('/user/total_bids/count', (req, res) => {
    const userId = req.params.userId;
    db.query("SELECT COUNT(*) AS count FROM product_registration", (err, result) => {
      if (err) {
        console.error('Error fetching user_queries count:', err);
        res.status(500).json({ error: 'An error occurred while fetching user_queries count' });
        return;
      }
      const count = result[0].count;
      res.status(200).json({ count });
    });
});

app.listen(8081, () => {
    console.log("Server is Running...");
})