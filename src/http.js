function http(url, method, params, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      if(xhr.status === 200) {
        try { cb(null, JSON.parse(xhr.responseText)); }
        catch (e) { cb(e, null); }
      } else cb(xhr.status, null);
    }
  };
  xhr.send(JSON.stringify(params));

  return xhr;
}

export const post = (url, params, cb) => http(url, 'POST', params, cb);
export const put = (url, params, cb) => http(url, 'PUT', params, cb);
export const del = (url, params, cb) => http(url, 'DELETE', params, cb);
export const get = (url, params, cb) => {
  const paramArray = [];
  for(const key in params) {
    const encodedKey = encodeURIComponent(key);
    const encodedVal = encodeURIComponent(params[key]);
    paramArray.push(`${encodedKey}=${encodedVal}`);
  }
  url += `?${paramArray.join('&')}`;
  return http(url, 'GET', {}, cb);
};