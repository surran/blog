  export const loadFile = (filePath, successCallback, failureCallback) => {
    fetch(filePath).then(function(res) {
          if (res.status >= 400) {
            if(failureCallback)
            {
              failureCallback()
            }
            else
              throw new Error("Data Not Found");
          }
          else
            return res.text();
      })
      .then(function(responseData) {
        if (successCallback) 
          successCallback(responseData)
      });
  }