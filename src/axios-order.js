import axios from 'axios';

const instance= axios.create({
    baseURL:'https://gallery-project-ef964-default-rtdb.firebaseio.com/',
});

export default instance;