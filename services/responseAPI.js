class ResponseAPI {
    isError = false
    data = null
    errorMessage = ''
    status = null

    constructor() {
        const { status, isError, data, errorMessage } = this

        this.format = {
            isError,
            data,
            errorMessage,
            status
        }
    }

    formatResponse({ status, data, errorMessage }) {
        switch (status) {
            case 200:
                return { ...this.format, status, data }
            case 400:
                return { ...this.format, status, isError: true, errorMessage: "parameter is validation error!" }
            case 500:
                return { ...this.format, status, isError: true, errorMessage: errorMessage || "Some error occurred" }
        }
console.log(status,'error?')
        return { ...this.format, status }
    }
}

module.exports = ResponseAPI;