class http {

    static instance = new http();

    baseURL = "http://localhost:5000/";

    fetch = (url, options) => fetch(this.baseURL + url, {
        mode: 'no-cors',
        method: "GET",
        ...options
    });

    post = (url, options) => this.fetch(url, {
        method: "POST",
        ...options,
    });

    get = async (url) => await this.fetch(url)

    static error (res, message, code) {
        res.status(code || 500).send({
            success: false,
            data: {
                message,
            }
        })
    }

    static success (res, data) {
        res.status(200).send({
            sucess: true,
            data: {
                message: "Task successfully finished.",
                ...data,
            }
        })
    }


}

export default http;