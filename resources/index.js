import api from '../index'

/**
 * @param {object} loginData
 * @param {function} successHandler
 * @param {function} errorHandler
 */
export function login(loginData, successHandler, errorHandler = null) {
    // loginData = {
    //     email: string,
    //     password: string,
    //     remember: boolean
    // };
    api.post('/login', loginData, successHandler, errorHandler);
}

/**
 * @param {function} successHandler
 * @param {function} errorHandler
 */
export function getAllCouriers(successHandler, errorHandler = null) {
    api.get('/couriers', successHandler, errorHandler);
}
