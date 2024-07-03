function setCookie(context, token, logout=false) {
  const cookieExpiration = 1;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + cookieExpiration);

  context.cookies.set("authorization", token, {
    signed: true,
    expires: logout ? new Date()  : expirationDate, // expire the cookie if logout user logs out
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: "strict",
  });
}

if (exports){
    exports.setCookie = setCookie
}