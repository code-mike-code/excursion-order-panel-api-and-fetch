class ExcursionsAPI {
    constructor() {
        // URL do naszego APi
        this.baseURL = 'http://localhost:3000';
    }
    // pobiera liste wycieczek
    async getExcursions() {
        try {
            const response = await fetch(`${this.baseURL}/excursions`)
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            console.error('Błąd pobierania wycieczek!', error);
            throw new Error(`Błąd pobierania wycieczek!`)
        }
    }
    // dodaje wycieczke do serwera
    async addExcursions(excursionData) {
        try {
            const response = await fetch(`${this.baseURL}/excursions`, {
                method: 'POST',
                body: JSON.stringify(excursionData),
                headers: { 'Content-Type': 'application/json' },
            })
            if (!response.ok) throw new Error('Problem z dodaniem wycieczki')
            return await response.json()
        } catch (err) {
            console.error('Błąd ExcursionsAPI.addExcursion:', err);
            throw err
        }
    }
    // usuwa wycieczke wg ID
    async deleteExcursion(id) {
        try {
            const response = await fetch(`${this.baseURL}/excursions/${id}`, {
                method: 'DELETE',
            })
            
            if (!response.ok) throw new Error('Problem z usunięciem wycieczki')
            return true
        } catch (err) {
            console.error('Błąd ExcursionsAPI.deleteExcursion:', err);
            throw err
        }
    }
    // aktualizacja wycieczki juz istniejącej
    async updateExcursion(id, excursionData) {
        try {
            const response = await fetch(`${this.baseURL}/excursions/${id}`, {
                method: 'PUT', 
                body: JSON.stringify(excursionData),
                headers: { 'Content-Type': 'application/json' },
            })
            
            if (!response.ok) throw new Error('Problem z aktualizacją wycieczki')
            return await response.json()
        } catch (err) {
            console.error('Błąd ExcursionsAPI.updateExcursion:', err);
            throw err
        }
    }
    // dodawanie nowego zamówienia 
    async addOrder(orderData) {
        try {
            const response = await fetch(`${this.baseURL}/orders`, {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: { 'Content-Type': 'application/json' },
            })
            
            if (!response.ok) throw new Error('Problem z dodaniem zamówienia')
            return await response.json()
        } catch (err) {
            console.error('Błąd ExcursionsAPI.addOrder:', err);
            throw err
        }
    }
}
    
export default ExcursionsAPI;