import Url from '../Config/Url';
import qs from 'qs';
import AuthHelper from './AuthHelper';
import * as RootNavigation from '../Context/RootNavigation';
export const REQUEST_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  OPTION: 'option',
};

const Request = async (url, options, useAuth = false) => {
  const {method = REQUEST_METHOD.GET, data, params, headers} = options;

  options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (useAuth) {
    // get token from persistent storage
    let data = await AuthHelper.getAuthData();
    let token = '';
    if (data != null && data.token) {
      token = data.token;
    }

    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    if (options.headers['Content-Type'] === 'application/json') {
      options.body = JSON.stringify(data);
    } else {
      // for form data
      let formData = new FormData();

      for (let key in data) {
        // if data[key] is array, then append each item
        if (Array.isArray(data[key])) {
          data[key].forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, data[key]);
        }
      }

      console.log('FORM DATA: ', formData);

      options.body = formData;
    }
  }

  if (params) {
    url = `${url}?${qs.stringify(params)}`;
  }

  let response = await fetch(url, options);

  let responseJson = await response.json();

  if (useAuth === true && response.status === 401) {
    console.log('unauthorize');
    return await HandleUnauthorized(url, options, responseJson);
  } else if (response.status === 500) {
    console.error('SERVER 500 ERROR', responseJson);
  }

  return responseJson;
};

const HandleUnauthorized = async (url, options, response) => {
  // get refresh token from persistent storage
  const data = await AuthHelper.getAuthData();
  let refreshToken = null;
  if (data != null && data.refreshToken) {
    refreshToken = data.refreshToken;
  }

  if (refreshToken) {
    // get new token
    let new_token = await RefreshToken(refreshToken);

    if (!new_token.success) {
      // console.log(RootNavigation)
      RootNavigation.replace('app.auth.chooselogin');
      RootNavigation.reset();
      // await AuthHelper.removeAuthData();
      return response;
    } else {
      // set new token
      await AuthHelper.setAuthData(new_token.data);
      let data = await AuthHelper.getAuthData();

      console.log('--- SUKSES GENERATE AUTH -----');
      console.log(data);
    }

    // try Request again
    return await Request(url, options, true);
  } else {
    // logout
    // await AuthHelper.removeAuthData();
    RootNavigation.replace('app.auth.chooselogin');
    RootNavigation.reset();

    return response;
  }
};

const RefreshToken = async refresh_token => {
  console.log('===== REFRESH TOKEN =====');
  console.log(refresh_token);
  const response = await Request(Url.API.AUTH.REFRESH_TOKEN, {
    method: REQUEST_METHOD.POST,
    data: {
      grant_type: 'refresh_token',
      refresh_token,
    },
  });
  console.log(response);

  return response;
};

const FPost = async (url, data) => {
  return await Request(url, {
    method: REQUEST_METHOD.POST,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const FGet = async (url, params) => {
  return await Request(url, {
    method: REQUEST_METHOD.GET,
    params,
  });
};

const FPut = async (url, data) => {
  return await Request(url, {
    method: REQUEST_METHOD.PUT,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const FDelete = async (url, data) => {
  return await Request(url, {
    method: REQUEST_METHOD.DELETE,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const FGetWA = async (url, params) => {
  return await Request(
    url,
    {
      method: REQUEST_METHOD.GET,
      params,
    },
    true,
  );
};

const FPostWA = async (url, data) => {
  return await Request(
    url,
    {
      method: REQUEST_METHOD.POST,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    true,
  );
};

const FPutWA = async (url, data) => {
  return await Request(
    url,
    {
      method: REQUEST_METHOD.PUT,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    true,
  );
};

const FDeleteWA = async (url, data) => {
  return await Request(
    url,
    {
      method: REQUEST_METHOD.DELETE,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    true,
  );
};

export default {
  FPost,
  FGet,
  FPut,
  FDelete,
  FGetWA,
  FPostWA,
  FPutWA,
  FDeleteWA,
  Request,
};
