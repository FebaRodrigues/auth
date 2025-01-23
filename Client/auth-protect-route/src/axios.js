import axios from 'axios';

const instance=axios.create({
    baseURL:'https://auth-one-weld.vercel.app/'
});

export default instance;