import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('client');

document.addEventListener('DOMContentLoaded', initClient)

function initClient() {
    const api = new ExcursionsAPI()
    
    const excursionsList = document.querySelector('.excursions')
    const orderForm = document.querySelector('.order')
    const summaryList = document.querySelector('.summary')
    const totalPriceElement = document.querySelector('.order__total-price-value')
    
    let cart = []
    
    loadExcursions()
    
    // ładowanie wycieczek z servera na stronę
    async function loadExcursions() {
        try {
            const excursions = await api.getExcursions()
            displayExcursions(excursions)
        } catch (err) {
            console.error('Błąd ładowania wycieczek:', err);
            alert('Nie udało się załadować wycieczek!');
        }
    }
    
   // wyświetla lise wycieczek na stronie
    function displayExcursions(excursions) {
        const prototype = document.querySelector('.excursions__item--prototype')
        console.log('Prototyp elementu:', prototype);
        
        excursionsList.innerHTML = '';
        excursionsList.appendChild(prototype)
        
        excursions.forEach(excursion => {
            const newExcursion = prototype.cloneNode(true)
            console.log('Sklonowany element:', newExcursion);

            newExcursion.classList.remove('excursions__item--prototype')
            newExcursion.dataset.id = excursion.id
            newExcursion.style.display = 'block'

            newExcursion.querySelector('.excursions__title').textContent = excursion.name
            newExcursion.querySelector('.excursions__description').textContent = excursion.description
            
            const priceElements = newExcursion.querySelectorAll('.excursions__price')
            priceElements[0].textContent = excursion.adultPrice
            priceElements[1].textContent = excursion.childPrice
            
            newExcursion.dataset.adultPrice = excursion.adultPrice
            newExcursion.dataset.childPrice = excursion.childPrice

            
            excursionsList.appendChild(newExcursion)
        })
    }
    
   // handler dodawania wycieczki do kosyka
    excursionsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('excursions__field-input--submit')) {
            e.preventDefault()
            const excursionElement = e.target.closest('.excursions__item')

            const adultInput = excursionElement.querySelector('input[name="adults"]')
            const childInput = excursionElement.querySelector('input[name="children"]')
            
            const adults = parseInt(adultInput.value) || 0;
            const children = parseInt(childInput.value) || 0;
         
            if (adults > 0 || children > 0) {
                addToCart(
                    excursionElement.dataset.id,
                    excursionElement.querySelector('.excursions__title').textContent,
                    excursionElement.dataset.adultPrice,
                    excursionElement.dataset.childPrice,
                    adults,
                    children,
                )
            adultInput.value = '';
            childInput.value = '';
            } else {
                alert('Podaj poprawną liczbe uczestników!')
            }
        }
    })
    
  // dodaje wycieczke do koszyka
    function addToCart(excursionId, name, adultPrice, childPrice, adults, children) {
        if (adults > 0 || children > 0) {
            cart.push({
                id: Date.now(), 
                excursionId: excursionId,
                name: name,
                adultPrice: parseFloat(adultPrice),
                childPrice: parseFloat(childPrice),
                adults: adults,
                children: children,
            })
            updateSummary()
        } 
    }
    
   // podsumowanie zamówienia
    function updateSummary() {
        const prototype = document.querySelector('.summary__item--prototype')
        if (!prototype) {
            console.error('Nie znaleziono prototypu elementu podsumowania!');
            return
        }
        
        document.querySelectorAll('.summary__item:not(.summary__item--prototype)').forEach(el => el.remove())
        
        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = (item.adults * item.adultPrice) + (item.children * item.childPrice)
            
            const newItem = prototype.cloneNode(true)
            newItem.classList.remove('summary__item--prototype')
            newItem.style.display = 'block'
            newItem.dataset.id = item.id
            
            newItem.querySelector('.summary__name').textContent = item.name
            newItem.querySelector('.summary__total-price').textContent = `${itemTotal}PLN`;
            
            let pricesText = []
            if (item.adults > 0) {
                pricesText.push(`Dorośli: ${item.adults} x ${item.adultPrice}PLN`)
            }
            if (item.children > 0) {
                pricesText.push(`Dzieci: ${item.children} x ${item.childPrice}PLN`)
            }
            
            newItem.querySelector('.summary__prices').textContent = pricesText.join(', ')
            
            newItem.querySelector('.summary__btn-remove').addEventListener('click', (e) => {
                e.preventDefault()
                cart = cart.filter(cartItem => cartItem.id !== item.id)
                updateSummary()
            })
            
            summaryList.appendChild(newItem)
            totalPrice += itemTotal
        })
        
        totalPriceElement.textContent = `${totalPrice}PLN`;
    }
    
   // handler składania zamówienia
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const nameInput = orderForm.querySelector('input[name="name"]')
        const emailInput = orderForm.querySelector('input[name="email"]')
        
        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        
        const errors = []
        if (!name) errors.push('Imię i nazwisko jest wymagane!')
        if (!email) {
            errors.push('Email jest wymagany!')
        } else if (!email.includes('@')) {
            errors.push('Nieprawidłowy format email!');
        }
        if (cart.length === 0) errors.push('Koszyk jest pusty')
        
        if (errors.length > 0) {
            alert(errors.join('\n'))
            return
        }
        
        try {
            const orderData = {
                name,
                email,
                excursions: cart.map(item => ({
                    excursionId: item.excursionId,
                    adults: item.adults,
                    children: item.children,
                })),
                totalPrice: parseInt(totalPriceElement.textContent)
            }
            
            await api.addOrder(orderData)
            

            cart = []
            updateSummary()
            nameInput.value = '';
            emailInput.value = '';
            
            alert('Zamówienie zostało złożone pomyślnie!');
        } catch (err) {
            console.error('Błąd składania zamówienia:', err);
            alert('Wystąpił błąd podczas składania zamówienia');
        }
    })
}