export const handleSuccess = (response: any, callback: Function) => {
  if (callback) callback(response.data);
};

export const handleError = (error: any, callback: Function) => {
  if (callback) {
    callback(error);
  } else {
    console.error(error);
  }
};
