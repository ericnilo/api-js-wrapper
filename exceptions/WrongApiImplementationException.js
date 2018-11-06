export default class WrongApiImplementationException extends Error {
    constructor() {
        super();

        this.text = 'Adapter must implement ApiInterface';
    }
}
