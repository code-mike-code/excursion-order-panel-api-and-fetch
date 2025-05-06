class ExcursionsAPI {
    constructor() {
        this.excursionsApiUrl = 'http://localhost:3000/excursions'
        this.ordersApiUrl = 'http://localhost:3000/orders'
    }

    getExcursions() {
        return fetch(this.excursionsApiUrl)
            .then(response => {
                if (response.ok) { return response.json() }
                return Promise.reject(response.status)
            })
            .catch(err => console.error('błąd pobierania wycieczki', err))
    }
}

export default ExcursionsAPI;