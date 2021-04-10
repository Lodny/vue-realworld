export const getErrorList = (errors) => {
  const errlist = [];

  if (errors) {
    Object.keys(errors).forEach((key) => {
      errors[key].forEach((val) => errlist.push(`${key} : ${val}`));
    });
  }

  console.log('util : getErrorList : ', errlist);

  return errlist;
};

export const getHeader = (user) => {
  if (user)
    return {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Headers': 'authorization',
        authorization: `Token ${user.token}`,
      },
    };
  else
    return {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
};
