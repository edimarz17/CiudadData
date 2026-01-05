/**
 * Error HTTP con código de estado asociado para propagar a middlewares Express.
 */
export class HttpError extends Error {
    status: number;
    constructor(status: number, message?: string) {
        super(message ?? '');
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}