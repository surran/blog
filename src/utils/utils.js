  export const loadFile = (filePath, successCallback, failureCallback) => {
    fetch(filePath).then(function(res) {
          if (res.status >= 400) {
            if(failureCallback)
            {
              failureCallback()
            }
            throw new Error("Data Not Found");
          }
          return res.text();
      })
      .then(function(responseData) {
        if (successCallback) 
          successCallback(responseData)
      });
  }