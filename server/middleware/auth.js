const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];//&& viết tắt: nếu k có authheader thì là giá trị đó, còn nếu có thì thực thi vế sau
        //console.log(token)
        if(!token) return res.status(400).json({success: false, message: 'Invalid Authorization'});

        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({success: false, message: 'Invalid Authorization'});
                req.user = user;
                next();
            });
        } catch (error) {
            console.log(error);
            res.status(403);
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = verifyToken