import ApiInterface from './ApiInterface';
import __isEqual from 'lodash.isequal';
import axios from 'axios';
import {TOKEN_MISMATCH} from '../httpStatusCodes';
import {showSessionTimeout} from "../showSessionTimeout";

class AxiosApiAdapter extends ApiInterface {
    constructor(axios) {
        super();

        this.axios = axios;
        this._initializeCsrfToken();
        this._catchSessionTimeout();
    }

    get(path, successHandler, errorHandler = null, params = {}, config = {}) {
        if (!__isEqual(params, {})) {
            config.params = params;
        }

        this._commonHandler(this.API_METHOD_GET, path, config, successHandler, errorHandler);
    }

    post(path, data, successHandler, errorHandler = null, config = {}) {
        config.data = data;

        this._commonHandler(this.API_METHOD_POST, path, config, successHandler, errorHandler);
    }

    patch(path, data, successHandler, errorHandler = null, config = {}) {
        config.data = data;

        this._commonHandler(this.API_METHOD_PATCH, path, config, successHandler, errorHandler);
    }

    delete(path, data, successHandler, errorHandler = null, config = {}) {
        config.data = data;

        this._commonHandler(this.API_METHOD_DELETE, path, config, successHandler, errorHandler);
    }

    put(path, data, successHandler, errorHandler = null, config = {}) {
        config.data = data;

        this._commonHandler(this.API_METHOD_PUT, path, config, successHandler, errorHandler);
    }

    _initializeCsrfToken() {
        let token = document.head.querySelector('meta[name="csrf-token"]');

        if (token) {
            this.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

            return;
        }

        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    _catchSessionTimeout() {
        this.axios.interceptors.response.use(
            null,
            error => {
                if (error.config && error.response && error.response.status === TOKEN_MISMATCH) {
                    return showSessionTimeout();
                }

                return Promise.reject(error);
            }
        );
    }

    _commonHandler(type, path, config, successHandler, errorHandler = null) {
        this.axios({
                ...config,
                method: type,
                url: path,
            }
        ).then(response => {
            const apiResponseData = response.data;

            let responseData = apiResponseData;
            let isSuccess = null;
            let message = null;

            if (apiResponseData.hasOwnProperty('data')) {
                responseData = apiResponseData.data;
            }
            if (apiResponseData.hasOwnProperty('success')) {
                isSuccess = apiResponseData.success;
            }
            if (apiResponseData.hasOwnProperty('message')) {
                message = apiResponseData.message;
            }

            successHandler({responseData, isSuccess, message, response});
        }).catch(response => {
            if (typeof errorHandler !== 'function') return;

            errorHandler(response);
        })
    }
}

export default new AxiosApiAdapter(axios);
