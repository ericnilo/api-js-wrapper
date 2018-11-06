import adapter from './vendor/axiosApiAdapter';
import ApiInterface from "./vendor/ApiInterface";
import WrongApiImplementationException from "./exceptions/WrongApiImplementationException";

if (!(adapter instanceof ApiInterface)) {
    throw new WrongApiImplementationException();
}

export default {
    /**
     * Use method GET to connect to a server
     *  Retrieve a resource or a collection.
     *  `GET` method and query parameters should not alter the state.
     *
     * @param {String} path
     * @param {Function} successHandler
     * @param {Function} errorHandler=null
     * @param {Object} params={}
     * @param {Object} config={}
     */
    get: (path, successHandler, errorHandler = null, params = {}, config = {}) =>
        adapter.get(path, successHandler, errorHandler, params, config),

    /**
     * Use method POST to connect to a server
     *  Create a resource.
     *  The `POST` method can be used to update a resource but it’s not recommended.
     *
     * @param {String} path
     * @param {Object} data
     * @param {Function} successHandler
     * @param {Function} errorHandler=null
     * @param {Object} config={}
     */
    post: (path, data, successHandler, errorHandler = null, config = {}) =>
        adapter.post(path, data, successHandler, errorHandler, config),

    /**
     * Use method PATCH to connect to a server
     *  Update a resource or a collection.
     *  A resource can be updated by sending a `PATCH` request to the URL that represents the resource.
     *
     * @param {String} path
     * @param {Object} data
     * @param {Function} successHandler
     * @param {Function} errorHandler=null
     * @param {Object} config={}
     */
    patch:  (path, data, successHandler, errorHandler = null, config = {}) =>
        adapter.patch(path, data, successHandler, errorHandler, config),

    /**
     * Use method DELETE to connect to a server
     *   Remove a resource or a collection.
     *
     * @param {String} path
     * @param {Function} successHandler
     * @param {Function} errorHandler=null
     * @param {Object} data={}
     * @param {Object} config={}
     */
    delete: (path, successHandler, errorHandler = null, data = {}, config = {}) =>
        adapter.delete(path, data, successHandler, errorHandler, config),

    /**
     * Use method PUT to connect to a server
     *  Replace a resource or a collection.
     *  The `PUT` method can also be used to create a resource
     *      if we can choose the id in advance for example.
     *      The only constraint with the PUT method is
     *      that it must be idempotent. I.e. the number of
     *      times we send the same `PUT` request should not have
     *      any impact on the result.
     *
     * @param {String} path
     * @param {Object} data
     * @param {Function} successHandler
     * @param {Function} errorHandler=null
     * @param {Object} config={}
     */
    put: (path, data, successHandler, errorHandler = null, config = {}) =>
        adapter.put(path, data, successHandler, errorHandler, config),
};
