export class ResponseAPI {
    constructor() {
        this.data = null
        this.status = null
        this.isError = false
        this.errorMsg = ''
    }

    getResponse(status, data) {
        switch (status) {
            case 200:
                this.data = data
                this.status = status
                break;
            case 400:
                this.isError = true
                this.status = status
                this.errorMsg = 'parameter is validation error!'
                break;
            case 500:
                this.isError = true
                this.status = status
                this.errorMsg = 'Some error occurred while creating the Restaurant'
                break;
        }

        return this
    }
}