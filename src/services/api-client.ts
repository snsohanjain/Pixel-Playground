import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api/',
    params: {
        key: '91cba11e216646b59d4d6c933677860b'
    }
})