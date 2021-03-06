import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;

  const findAllPosts = async (query = null) => {
    let url = `${BASE_URL}/posts`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }

  const findAllDogs = async (query = null) => {
    let url = `${BASE_URL}/dogs`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }

  const findAllCats = async (query = null) => {
    let url = `${BASE_URL}/cats`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }

  const findAllShelters = async (query = null) => {
    let url = `${BASE_URL}/shelters`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }

  const findAllWalks = async (query = null) => {
    let url = `${BASE_URL}/walks`;
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }

  const findPost = async (id) => {
    let url = `${BASE_URL}/posts/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const findCat = async (id) => {
    let url = `${BASE_URL}/cat_detail/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const findDog = async (id) => {
    let url = `${BASE_URL}/dog_detail/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const findWalk = async (id) => {
    let url = `${BASE_URL}/walk_detail/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const findShelter = async (id) => {
    let url = `${BASE_URL}/shelter_detail/${id}`;
    const response = await fetch(url);
    return response.json();
  }


  const createPostViewModel = async (post) => {
    let url = `${BASE_URL}/posts/create`;
    const response = await fetch(url);
    return response.json();
  }

  const storePost = async (post) => {
    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts`;
    const response = await fetch(url, options);
    return response.json();
  }

  const editPostViewModel = async (postId) => {
    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/${postId}/edit`;
    const response = await fetch(url, options);
    return response.json();
  }

  const updatePost = async (post) => {
    const options = {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts/${post._id}`;
    const response = await fetch(url, options);
    return response.json();
  }

  const deletePost = async (id, mode = 0) => {
    const options = {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(`${BASE_URL}/posts/${id}?mode=${mode}`, options);
    return await response.json();
  }

  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
    <ApiContext.Provider value={{ createPostViewModel, deletePost, findAllPosts,findAllDogs, findAllCats, findAllShelters, findAllWalks, findPost, findCat, findDog, findWalk, findShelter, storePost, editPostViewModel, updatePost }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}
