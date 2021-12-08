const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');


const createToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    return {accessToken, refreshToken};
}
const updateRefreshToken = async (email, refreshToken) => {
    try {
        await Users.findOneAndUpdate({email}, {refreshToken});
    } catch (error) {
        console.log(error)
    }
}

const userCtrl = {
    register: async (req, res) =>{
        const {username, email, password} = req.body;
    
        if(!username || !email || !password)
            return res.status(400).json({success: false, message: "Please enter full information."})
        try {
            //check for existing acccount in db
            const user = await Users.findOne({email});
            if(user) return res.status(400).json({success: false, message: "This user name already exists."})
            
            //check password length
            if(password.length < 6) return res.status(400).json({success: false, message: "Password must be at least 6 characters."})

            //all good
            const hashedPassword = await argon2.hash(password);
            const newUser = new Users({username, password: hashedPassword, email, role: 'user'});
            await newUser.save();
            
            //return token
            //const token = createToken({id: user._id});
            res.json({success: true, message: "Register successfully"})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
    },
    login: async (req, res)=>{
        const {email, password} = req.body;
        if(!email || !password)
            return res.json({success: false, message: "Please enter full information."})
        try {
            //check for existing loginName
            const user = await Users.findOne({email});
            if(!user) return res.json({success: false, message: "Email or Password are incorrect"})
            //check for existing password
            const passwordValid = await argon2.verify(user.password, password);
            if(!passwordValid) return res.json({success: false, message: "Email or Password are incorrect"}) //nếu có res.status(400) thì khi có lỗi, chương trình sẽ không cho phép các câu lệnh phía dưới lời gọi API này hoạt động.

            //all good
            const tokens = createToken({id: user._id});
            updateRefreshToken(email, tokens.refreshToken);
            res.json({success: true, message: "Login successfully", accessToken: tokens.accessToken});
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }   
    },
    // loginWith: async (req, res) => {
    //     const {loginName, userName, userAvatar} = req.body;
    //     if(!loginName) return res.status(400).json({success: false, message: "Chưa có thông tin yêu cầu"})
        
    //     try {
    //         //check for existing loginName
    //         const user = await User.findOne({loginName});
    //         var tokens = {}
    //         if(!user) {
    //             const newUser = new User({
    //                 loginName, 
    //                 password: 'Login With Google', 
    //                 userName, 
    //                 userAvatar,
    //                 userRole: 0
    //             });
    //             await newUser.save();
    //             tokens = createToken({id: newUser._id});
    //             updateRefreshToken(loginName, tokens.refreshToken);
    //         }else{
    //             tokens = createToken({id: user._id});
    //             updateRefreshToken(loginName, tokens.refreshToken);
    //         }
    //         res.json({success: true, message: "Đăng nhập thành công", accessToken: tokens.accessToken});
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({success: false, message: "Internal Server Error"});
    //     }
    // },
    putRefreshToken: async (req, res) => {
        const {refreshToken} = req.body;
        if(!refreshToken) return res.status(401).json({success: false, message: "Please Login or Register"});

        const user = await Users.findOne({refreshToken});
        if(!user) return res.status(403).json({success: false, message: "RefreshToken Wrong"});

        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const tokens = createToken({id: user._id});
            updateRefreshToken(user.email, tokens.refreshToken);
            res.json({success: true, tokens});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"})
        }
    },
    logout: async (req, res) => {
        try {
            await Users.findByIdAndUpdate({_id: req.user.id}, {refreshToken: null});
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
}

module.exports = userCtrl

