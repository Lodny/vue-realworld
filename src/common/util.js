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
