import { API } from "../../config/API/api.config";
import Auth from "../Auth";
import * as authUtil from "../../utils/auth.util";
export const BaseURL = API.endpoint + "/";
export const Bucket =
  "https://grubgrams.s3.amazonaws.com/";
const axios = require("axios").default;

const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true,
};

const signout = () => {
    localStorage.clear();
    window.location.reload();
}

export const ApiPostNoAuth = (type, userData) => {
  // console.log("In api post without auth", API);
  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + type,
        userData,
        getHttpOptions({ ...defaultHeaders, isAuth: false })
      )
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const Api = (type, methodtype, userData) => {
  return new Promise((resolve, reject) => {
    userData = userData || {};
    axios({
      url: BaseURL + type,
      headers: getHttpOptions(),
      data: userData,
      type: methodtype,
    })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};
export const reftoken = async(i,j,k) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const rtoken = JSON.parse(localStorage.getItem("ref_token"))
  const body = {
    old_token: token,
    refresh_token: rtoken
  };
  let extracol
  await ApiPostNoAuth("admin/generate_token", body)
    .then(async (res) => {
      console.log(res)
      authUtil.setToken(res.data.data.token);
      authUtil.setRToken(res.data.data.refresh_token);
      // window.location.reload()
console.log(i)
      if(i=="ApiGet"){
        
        await ApiGet(j)
        .then((res) => {
          console.log(res)
          extracol = res
        })
       
      }else if(i=="ApiDelete"){
        await ApiDelete(j)
        .then((res) => {
          console.log(res)
          extracol = res
        })
      }else if(i=="ApiPut"){
        await ApiPut(j,k)
        .then((res) => {
          console.log(res)
          extracol = res
        })
      }else if(i=="ApiPost"){
        await ApiPost(j,k)
        .then((res) => {
          console.log(res)
          extracol = res
        })
      }else if(i=="ApiUpload"){
        await ApiUpload(j,k)
        .then((res) => {
          console.log(res)
          extracol = res
        })
      }
      // getDate(1, 10, statusp)


    })
    .catch((err) => {
    });
    return extracol
}
export const ApiGet = (type) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 2) {
    ext = "store_owner";
  } else {
    ext = "admin";
  }
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + ext + type, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          if(error.response.data.status==401){
            signout()
          }else{
            reject(error.response.data);
          }
          
          // console.log(error.response.data);
        } else {
          reject(error.response.data);
          console.log(error.response.data);
        }
      });
  });
};

export const ApiPost = (type, userData, AdditionalHeader) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 2) {
    ext = "store_owner";
  } else {
    ext = "admin";
  }
  return new Promise((resolve, reject) => {
    // console.log("dataBody", BaseURL);
    axios
      .post(BaseURL + ext + type, userData, {
        ...getHttpOptions(),
        ...AdditionalHeader,
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          if(error.response.data.status==401){
            signout()
          }else{
            reject(error.response.data);
          }
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiPut = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 2) {
    ext = "store_owner";
  } else {
    ext = "admin";
  }
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + ext + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          // if(error.response.data.status==410){
          //   reftoken("ApiGet",type)
          // }else{
            reject(error.response.data);
          // }
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiUpload = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, {
        ...getHttpOptions(),
        ...AdditionalHeader,
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          // if(error.response.data.status==410){
          //   reftoken("ApiGet",type)
          // }else{
            reject(error.response.data);
          // }
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiPatch = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(BaseURL + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiDelete = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 2) {
    ext = "store_owner";
  } else {
    ext = "admin";
  }
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + ext + type, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiDownload = (type, userData) => {
  let method = userData && Object.keys(userData).length > 0 ? "POST" : "GET";
  return new Promise((resolve, reject) => {
    axios({
      url: BaseURL + type,
      method,
      headers: getHttpOptions().headers,
      responseType: "blob",
      data: userData,
    })
      .then((res) => resolve(new Blob([res.data])))
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiGetBuffer = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          // console.log(response.headers.get("content-type"));
          // console.log(response);
          return response.buffer();
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const ApiGetInce = (type, tokan) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "GET",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },
    })
      .then(async (response) => {
        // console.log(response)
        if (response.ok) {
          const body = await response.json();
          // console.log(response.headers.get("content-type"));
          // console.log(response);
          return body;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
export const ApiDeleteInce = (type, tokan, body) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "Delete",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        // console.log(body)
        // console.log(response)
        if (response.ok) {
          const body1 = await response.json();
          // console.log(response.headers.get("content-type"));
          // console.log(response);
          return body1;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
export const ApiPutInce = (type, tokan, body) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "Put",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        // console.log(body)
        // console.log(response)
        if (response.ok) {
          const body1 = await response.json();
          // console.log(response.headers.get("content-type"));
          // console.log(response);
          return body1;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
export const ApiPostInce = (type, tokan, body) => {
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "Post",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        // console.log(body)
        // console.log(response)
        if (response.ok) {
          const body1 = await response.json();
          // console.log(response.headers.get("content-type"));
          // console.log(response);
          return body1;
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const Logout = () => {
  return ApiPost("/accounts/logout", {});
};

export const getHttpOptions = (options = defaultHeaders) => {
  let headers = {};
  if (options.hasOwnProperty("isAuth") && options.isAuth) {
    headers["authorization"] = authUtil.getToken();
    headers["Cache-Control"] = "no-cache"
  }

  if (options.hasOwnProperty("api_key") && options.api_key) {
    headers["api_key"] = "6QSy49rUTH";
  }
  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
  }

  return { headers };
};
