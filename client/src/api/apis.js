const fetchData = async (url, method = "GET", body = null) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("authTokens")).access
        }`,
      },
      body: body ? JSON.stringify(body) : null,
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getData = async (url) => {
  try {
    const response = await fetchData(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url, data) => {
  try {
    const response = await fetchData(url, "POST", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const putData = async (url, data) => {
  try {
    const response = await fetchData(url, "PUT", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await fetchData(url, "DELETE", null);
    return response;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (url, data) => {
  try {
    const response = await fetchData(url, "PATCH", data);
    return response;
  } catch (error) {
    throw error;
  }
};
