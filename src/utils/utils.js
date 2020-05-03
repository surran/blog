import SUPPLIMENTARY_CONTENT from '../data/supplimentaryContent'

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

  const isReservedWordFunction = (word) => {
    return SUPPLIMENTARY_CONTENT.some(rwordData => rwordData.handle == word)
  }

  const isNoIndexFunction = (word) => {
    return SUPPLIMENTARY_CONTENT.some(rwordData => rwordData.handle == word && rwordData.noindex)
  }

  export const extractDataFromUrl = () => {
    const urlComponents = window.location.pathname.split("/")
    let urlHandle = false, isReservedWord = false, isNoIndex = false, categoryHandle = false;
    if (urlComponents.length >= 2)
    {
      if (urlComponents.length >= 3) urlHandle = urlComponents[2]
      categoryHandle = urlComponents[1]
      isReservedWord = categoryHandle && isReservedWordFunction(categoryHandle)
      isNoIndex =  categoryHandle && isNoIndexFunction(categoryHandle)
    }
    return { urlHandle, categoryHandle, isReservedWord, isNoIndex }
  }

  export function getCategoryFromNoteHandle(NoteHandle, catalogMap, categoryMap)
  {
    const noteObject = catalogMap[NoteHandle]
    if (noteObject && noteObject.tags && noteObject.tags.length > 0 )
    {
      const matchingCategories = noteObject.tags.filter(tag => tag in categoryMap)
      const firstMatchingCategory = (matchingCategories.length > 0) ? matchingCategories[0] : false
      return firstMatchingCategory
    }
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
