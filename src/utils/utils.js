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

  // Example POST method implementation:
export async function postData(url = '', data = {}) {
  // Default options are marked with *
  let res = false
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  try {
    res = JSON.parse(response);
  } catch(e) {
      //console.log(e); 
  }
  return res
}
