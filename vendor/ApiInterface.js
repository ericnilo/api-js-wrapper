export default class ApiInterface {
    constructor() {
        this.API_METHOD_GET = 'get';
        this.API_METHOD_POST = 'post';
        this.API_METHOD_PATCH = 'patch';
        this.API_METHOD_DELETE = 'delete';
        this.API_METHOD_PUT = 'put';
    }

    get(path, successHandler, errorHandler = null, params = {}, config = {}) {
        throw new Error('This method must be overwritten!');
    }

    post(path, data, successHandler, errorHandler = null, config = {}) {
        throw new Error('This method must be overwritten!');
    }

    patch(path, data, successHandler, errorHandler = null, config = {}) {
        throw new Error('This method must be overwritten!');
    }

    delete(path, data, successHandler, errorHandler = null, config = {}) {
        throw new Error('This method must be overwritten!');
    }

    put(path, data, successHandler, errorHandler = null, config = {}) {
        throw new Error('This method must be overwritten!');
    }
}
