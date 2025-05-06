class ExcursionsAPI {
    constructor() {
        this.excursionsApiUrl = 'http://localhost:3000/excursions'
        this.ordersApiUrl = 'http://localhost:3000/orders'
    }

    getExcursions() {
        return fetch(this.excursionsApiUrl)
            .then(response => {
                if (response.ok) { return response.json() }
                return Promise.reject(new Error(`Wystapił błąd podczas pobierania wycieczki! Status: ${response.status}`))
            })
            .catch(err => console.error('błąd pobierania wycieczki', err))
    }

    addExcursion(excursionData) {
        const options = {
            method: 'POST',
            body: JSON.stringify(excursionData),
            headers: { 'Content-Type': 'application/json' },
        }
        return fetch(this.excursionsApiUrl, options)
            .then(response => {
                if (response.ok) { return response.json() }
                return Promise.reject(new Error(`Wystapił błąd podczas dodawania wycieczki! Status: ${response.status}`))
            })
            .catch(err => console.error('błąd dodawania wycieczki', err))
    }

    removeExcursion(excursionId) {
        const options = {
            method: 'DELETE',
        }
        return fetch(`${this.excursionsApiUrl}/${excursionId}`, options)
            .then(response => {
                if (response.ok) { return response.json() }
                return Promise.resolve()
            })
            .catch(err => console.error('błąd dodawania wycieczki', err))
    }

    updateExcursion(excursionId, excursionData) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(excursionData),
            headers: { 'Content-Type': 'application/json' },
        }

        return fetch(`${this.excursionsApiUrl}/${excursionId}`, options)
            .then(response => {
                if (response.ok) { return response.json() }
                return Promise.reject(new Error(`Wystapił błąd podczas aktualizowania wycieczki! Status: ${response.status}`))
            })
            .catch(err => console.error('błąd aktualizowania wycieczki', err))

    }

    addOrder(orderData) {
        
        const options = {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: { 'Content-Type': 'application/json' },
        }

        return fetch(this.ordersApiUrl, options)
            .then(response => {
                if (response.ok) { return response.json() }
                    return Promise.reject(new Error(`Wystapił błąd podczas dodawania zamówienia! Status: ${response.status}`))
            })
            .catch(err => console.error('błąd dodawania zamówienia', err))
    }


}

export default ExcursionsAPI;