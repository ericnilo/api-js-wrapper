# API Wrapper (plus API guide)

API wrapper for different HTTP client such as axios and etc. 



## Purpose
- Create a centralize API calling for your application

Currently we use [axios](https://github.com/axios/axios) to send a request to the server 
 but for future proof code we've created an adapter instead
 so that we can easily change the vendor to another vendor.



## Complete Code Example

./resources/index.js
```
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
```

usage:

somewhere in your code:
```
import {
    login as apiLogin
} from "../../../api/resources";
 
apiLogin(this.loginData, ({responseData}) => {
    // success code here
});
```



### Parameters in `successHandler`

`successHandler` has only one parameter but has 4 indices such as:
```
({responseData?:any, isSuccess?:boolean, message?:string, response?:object}) => {
    // code block;
}
```
>**NOTE: Variable name must be same as the defined index key (must follow)**
`apiGetSession(this.loginData, ({responseData}) => {..});`



## Under the hood
What's under each important file:
- `./index.js` 
    
    All necessary http methods ( GET, POST, PATCH, DELETE, PUT) can be found here.
   
- `./resources/index.js`

    All http route path must be put here, so that there's only one defined path across the app 
      and preventing from code duplication, code maintainability and more.



## How to create a new request
Before creating a new request, developer must search for existing one and use it instead, 
but if not found create a new one.

> **NOTE:** All route must be put under `./resources/index.js` file 
(may change implementation in the future but for now just put your code there)

1. Know what proper http method to use or what is defined in the server routes.
    
    a. Use method **GET** to retrieve a resource or a collection.
    
    b. Use method **POST** to create a resource.
    
    c. Use method **PATCH** to update a resource or a collection.
    
    d. Use method **DELETE** to remove a resource or a collection.
    
    e. Use method **PUT** to replace a resource or a collection.
    
2. Create a new function with well defined and documented parameters.

    a. There must be a **JSDoc** in each defined route function and developer must set what data type is that.
    > **NOTE:** There are only [7 data types in javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures). 
    Primitive: boolean, null, undefined, number, string, symbol 
    and object (if argument is a function use function instead.)

    ```
    /**
     * @param {function} successHandler
     * @param {function} errorHandler
     */
    export function getAllCouriers(successHandler, errorHandler = null) {
        api.get('/couriers', successHandler, errorHandler);
    }
    ```
    
    b. Parameter in the function must not exceed five arguments, if more than that use `object` instead.
    > **NOTE:** 
    > 1. If argument is object developer must document what includes on the said object
    > 2. Create a meaningful variable name
    > 3. Always keep the JSDoc updated when you edit a index or parameter in it
    
    ```
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
    ```
    
    c. `successHandler` must always be present in the function.
    
    d. `errorHandler` can be optional.



## How to use the created request
Individually import the function, do not import all function only the needed one.

```
import {
    login as apiLogin
} from "../../../api/resources";
 
apiLogin(this.loginData, ({responseData}) => {
    // success code here
});
```
> **NOTE:** Use a prefix api then the function name to easily distinguish the code.
