const jwt = require("jsonwebtoken");
const secret = "yifeng"; //密钥
const cookieKey = "token";

exports.publish = function (res, info, expire = 3600 * 1000, path = "/") {
  if (typeof expire !== "number") {
    //处理用户只传入三个参数，且第三个参数设置path
    expire = 3600 * 1000;
    path = expire;
  }
  const token = jwt.sign(info, secret, {
    expiresIn: expire,
  }); //生成token

  //得到token后设置到cookie中
  res.cookie(cookieKey, token, {
    maxAge: expire,
    path: path,
  });

  //响应头中设置authorization，供除了浏览器之外的平台使用
  res.header("authorization", token);
};

//验证token
exports.verify = function (req) {
  let token = req.cookies[cookieKey] || req.headers.authorization;

  if (!token) throw "none jwt";

  const parts = token.split(" ");
  token = parts.length == 1 ? parts[0] : parts[1];
  try {
    token = jwt.verify(token, secret);
    return token;
  } catch (err) {
    throw "invalid token(jwt)";
  }
};
