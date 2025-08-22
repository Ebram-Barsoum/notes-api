import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from "../models/User.js";

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // 1- Check if email and password are provided
        if (!email || !password) {
            res.status(400).json({ message: "Email or password is missing" });
        }

        // 2- Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        // 3- Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({ message: "Invalid password" });
        }

        // 4- Generate auth token
        const authToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            authToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error!" });
    }
}

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // 1- Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).send({ message: "User already exists" });
        }

        // 2- Hash password
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        // 3- Create user
        const newUser = new User({
            name, email, password: hashedPassword
        });

        // 4- Save user
        await newUser.save();

        res.status(201).send({ message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error!" });
    }
} 