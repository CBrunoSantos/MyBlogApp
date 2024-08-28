import axios from 'axios';
const Api = () =>{

  const defaultOptions = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
};

const instance = axios.create(defaultOptions);

instance.interceptors.response.use(
    (response:any) => response
);


instance.interceptors.request.use(
  (error: any) => {
        return Promise.reject(error);
    },
);

return instance
}

export default Api;