import axios from 'axios';


class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(credentials, cb) {
        axios.post(
            `http://localhost:8000/login`, 
            credentials)
        .then(res => {
            console.log(res)
            this.authenticated = true;
            cb();
        })
        .catch( err => {
            throw err
        })
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();