class http {

    static instance = new http();

    fetch = (url, options) => fetch(url, {
        mode: 'no-cors',
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