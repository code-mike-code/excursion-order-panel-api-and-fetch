import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');


const api = new ExcursionsAPI()

function initExcursion() {
    const prototype = document.querySelector('.excursions__item--prototype')
    if (!prototype) {
        console.error('nie znaleziono prototypu wycieczki')
        return
    }

    const newExcursion = prototype.cloneNode(true)
    newExcursion.classList.remove('excursions__item--prototype')
    newExcursion.dataset.id = excursion.id

    const excursionTitle = newExcursion.querySelector('.excursions__title')
    const excursionDescription = newExcursion.querySelector('.excursions__description')
    const excursionPrice = newExcursion.querySelector('.excursions__price')

    if (excursionTitle) excursionTitle.textContent = excursion.title
    if (excursionDescription) excursionDescription.textContent = excursion.description
    if (excursionPrice) excursionPrice.textContent = excursion.price

    const updateButton = newExcursion.querySelector('.excursions__field-input--update')
    const removeButton = newExcursion.querySelector('.excursions__field-input--remove')

    if (removeButton) {
        removeButton.addEventListener('click', (e) => {
            e.preventDefault()
            handleRemoveExcursion(excursion.id)
        })
    }

    if (updateButton) {
        updateButton.addEventListener('click', (e) => {
            e.preventDefault()
            handleUpdateExcursion(excursion)
        })
    }

    excursionsList.appendChild(newExcursion)
}


function displayExcursions() {
    const excursionsList = document.querySelector('.panel__excursions')
    if (!excursionsList) {
        console.error('nie znaleziono listy wycieczek')
        return
    }

    api.getExcursions()
        .then(excursions => {
            excursionsList.querySelectorAll('.excursions__item:not(.excursions__item--prototype)')
                .forEach(item => item.remove())

            excursions.forEach(excursion => { 
                initExcursion(excursion, excursionsList) 
            })
        })
        .catch(err => {
            console.error('błąd pobierania wycieczek', err)
        })

}

function handleAddExcursionForm() {
    const form = document.querySelector('.form')
    if (!form) {
        console.error('nie znaleziono formularza')
        return
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const nameInput = form.querySelector('input[name="name"]')
        const descriptionInput = form.querySelector('input[name="description"]')
        const priceInput = form.querySelector('input[type="price"]')

        if (!nameInput || !descriptionInput || !priceInput) {
            alert('Wszystkie pola są wymagane!')
            return
        }
        if (priceInput.value === isNaN) {
            alert('Podaj liczby!')
        }

        const excursionData = {
            name: nameInput.value,
            description: descriptionInput.value,
            price: Number(priceInput.value),
        }

        const excursionId = form.dataset.editingId

        if (excursionId) {
            api.updateExcursion(excursionId, excursionData)
                .then(() => {
                    alert('Wycieczka została zaktualizowana!')
                    form.reset()
                    delete form.dataset.editingId
                    form.querySelector('input[type="submit"').value = 'Dodaj wycieczke'
                    displayExcursions()
                })
                .catch(err => {
                    console.error('błąd aktualizacji wycieczki', err)
                    alert('Wystąpił błąd podczas aktualizacji wycieczki. Spróbuj ponownie.')
                })
        } else {
            api.addExcursion(excursionData)
                .then(() => {
                    alert('Wycieczka została dodana!')
                    form.reset()
                    displayExcursions()
                })
                .catch(err => {
                    console.error('błąd dodawania wycieczki', err)
                    alert('Wystąpił błąd podczas dodawania wycieczki. Spróbuj ponownie.')
                })
        }
    })
}


function handleRemoveExcursion(excursionId) {
    if (!confirm('Czy na pewno chcesz usunąć wycieczkę?')) {
        return
    }

    api.removeExcursion(excursionId)
        .then(() => {
            alert('Wycieczka została usunięta!')
            displayExcursions()
        })
        .catch(err => {
            console.error('błąd usuwania wycieczki', err)
            alert('Wystąpił błąd podczas usuwania wycieczki. Spróbuj ponownie.')
        })
}





