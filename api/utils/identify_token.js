const isAdmin = (context) => {

  if (context.authUser != undefined && context.authUser.isAdmin) return true;

  return false;

}

const isEmployee = (context) => {

  if(context.authUser != undefined && !context.authUser.isAdmin) return true;

  return false;

}

module.exports = {

  isAdmin,
  isEmployee

}