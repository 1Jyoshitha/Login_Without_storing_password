const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const bigIntCryptoUtils = require('bigint-crypto-utils');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://jyothikakdr:QZcKGEaRcYNZnCGU@blockchain.lhpwl.mongodb.net/?retryWrites=true&w=majority&appName=blockchain');

// Function to generate prime numbers
const generatePrime = async (bits) => {
    return bigIntCryptoUtils.prime(bits);
};

// Function to generate a random number in the range [1, p-1]
const generateRandomNumber = (p) => {
    const randomBuffer = crypto.randomBytes(64); // Generate random bytes
    const randomBigInt = BigInt('0x' + randomBuffer.toString('hex')) % (p - BigInt(1)) + BigInt(1);
    return randomBigInt;
};

// Register Route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const user = await FormDataModel.findOne({ email });
    if (user) {
        return res.json("Already registered");
    }

    // Generate random prime numbers g and p
    const g = await generatePrime(512);
    const p = await generatePrime(512);

    // Hash the password to use as the private key 's'
    const s = BigInt("0x" + crypto.createHash('sha256').update(password).digest('hex'));
    
    // Compute public key y = g^s mod p
    const y = bigIntCryptoUtils.modPow(g, s, p);

    // Store in MongoDB without the password
    await FormDataModel.create({
        email,
        g: g.toString(),
        p: p.toString(),
        y: y.toString()
    });

    res.json("Registered successfully");
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await FormDataModel.findOne({ email });
    if (!user) {
        return res.json("No records found!");
    }

    // Retrieve g, p, and y from the user record
    const { g, p, y } = user;

    // Convert retrieved g, p, and y to BigInt
    const bigG = BigInt(g);
    const bigP = BigInt(p);
    const bigY = BigInt(y);

    // Generate random r in the range [1, p-1]
    const r = generateRandomNumber(bigP);
    const c = bigIntCryptoUtils.modPow(bigG, r, bigP);

    // Compute hash of c
    const e = BigInt("0x" + crypto.createHash('sha256').update(c.toString()).digest('hex'));

    // Hash the password again for validation
    const s = BigInt("0x" + crypto.createHash('sha256').update(password).digest('hex'));
    
    // Compute z = r + s * e mod p
    const z = (r + s * e) % bigP;

    // Validate: g^z mod p = c * y^e mod p
    const leftSide = bigIntCryptoUtils.modPow(bigG, z, bigP);
    const rightSide = (c * bigIntCryptoUtils.modPow(bigY, e, bigP)) % bigP;

    // Compare both sides for authentication
    if (leftSide === rightSide) {
        res.json("Success");
    } else {
        res.json("Wrong password");
        console.log(`Left Side: ${leftSide}, Right Side: ${rightSide}`);
    }
});

// Start server
app.listen(3001, () => {
    console.log("Server listening on port 3001");
});
