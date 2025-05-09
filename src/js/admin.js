import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');
console.log('ExcursionsAPI:', ExcursionsAPI);

document.addEventListener('DOMContentLoaded', initAdmin)

function initAdmin() {
    const api = new ExcursionsAPI()
    
    const excursionsList = document.querySelector('.excursions')
    const addForm = document.querySelector('.form')
    
    loadExcursions()
    
   // ładowanie wycieczek z serwera
    async function loadExcursions() {
        try {
            const excursions = await api.getExcursions()
            displayExcursions(excursions)
        } catch (err) {
            console.error('Błąd ładowania wycieczek:', err);
            alert('Nie udało się załadować wycieczek');
        }
    }
    
  // wyswietlanie wycieczek 
    function displayExcursions(excursions) {
        const prototype = document.querySelector('.excursions__item--prototype')
        
        excursionsList.innerHTML = '';
        excursionsList.appendChild(prototype);
        
        excursions.forEach(excursion => {
            const newExcursion = prototype.cloneNode(true)
            newExcursion.classList.remove('excursions__item--prototype')
            newExcursion.dataset.id = excursion.id
            
            newExcursion.querySelector('.excursions__title').textContent = excursion.name
            newExcursion.querySelector('.excursions__description').textContent = excursion.description
            
            const priceElements = newExcursion.querySelectorAll('.excursions__field-name strong')
            priceElements[0].textContent = excursion.adultPrice
            priceElements[1].textContent = excursion.childPrice
            
            const updateBtn = newExcursion.querySelector('.excursions__field-input--update')
            const removeBtn = newExcursion.querySelector('.excursions__field-input--remove')
        
            updateBtn.addEventListener('click', (e) => {
                e.preventDefault()
                prepareEditForm(excursion, newExcursion)
            })
            
            removeBtn.addEventListener('click', async (e) => {
                e.preventDefault()
                if (confirm('Czy na pewno chcesz usunąć tę wycieczkę?')) {
                    try {
                        await api.deleteExcursion(excursion.id)
                        newExcursion.remove()
                    } catch (err) {
                        console.error('Błąd usuwania wycieczki:', err);
                        alert('Nie udało się usunąć wycieczki');
                    }
                }
            })
            excursionsList.appendChild(newExcursion);
        })
    }
    
 // formularz edycji wycieczek 
    function prepareEditForm(excursion, element) {
        const form = element.querySelector('.excursions__form')
        
        form.querySelectorAll('.excursions__field').forEach(field => {
            field.style.display = 'none'
        })
        
        // kontener dla pól edycji
        const editContainer = document.createElement('div')
        editContainer.className = 'excursions__edit-container'
        
        // funkcja do tworzenia pól formularza
        const createField = (name, label, value, type = 'text') => {
            const field = document.createElement('div')
            field.className = 'excursions__field'
            
            const labelEl = document.createElement('label')
            labelEl.className = 'excursions__field-name'
            labelEl.textContent = `${label}: `;
            
            let input;
            if (type === 'textarea') {
                input = document.createElement('textarea')
                input.value = value
            } else {
                input = document.createElement('input')
                input.type = type
                input.value = value
            }
            input.name = name;
            labelEl.appendChild(input)
            field.appendChild(labelEl)
            
            return field
        }
        
        editContainer.appendChild(createField('name', 'Nazwa', excursion.name))
        editContainer.appendChild(createField('description', 'Opis', excursion.description, 'textarea'))
        editContainer.appendChild(createField('adultPrice', 'Cena dorosłego', excursion.adultPrice, 'number'))
        editContainer.appendChild(createField('childPrice', 'Cena dziecka', excursion.childPrice, 'number'))
        
        const buttonsContainer = document.createElement('div')
        buttonsContainer.className = 'excursions__field excursions__field--submit'
        
        const saveBtn = document.createElement('input')
        saveBtn.type = 'submit'
        saveBtn.value = 'Zapisz'
        saveBtn.className = 'excursions__field-input excursions__field-input--save'
        
        const cancelBtn = document.createElement('input')
        cancelBtn.type = 'button'
        cancelBtn.value = 'Anuluj'
        cancelBtn.className = 'excursions__field-input excursions__field-input--cancel'
        
        buttonsContainer.appendChild(saveBtn)
        buttonsContainer.appendChild(cancelBtn)
        editContainer.appendChild(buttonsContainer)
        
        form.appendChild(editContainer)
        
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const updatedData = {
                name: editContainer.querySelector('[name="name"]').value,
                description: editContainer.querySelector('[name="description"]').value,
                adultPrice: parseFloat(editContainer.querySelector('[name="adultPrice"]').value),
                childPrice: parseFloat(editContainer.querySelector('[name="childPrice"]').value)
            }
            
            try {
                await api.updateExcursion(excursion.id, updatedData)
                
                loadExcursions()
            } catch (err) {
                console.error('Błąd aktualizacji wycieczki:', err);
                alert('Nie udało się zaktualizować wycieczki');
            }
        })
        cancelBtn.addEventListener('click', () => {
            loadExcursions()
        })
    }
    
   // handler dodawania wycieczki
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const formData = new FormData(addForm)
        const newExcursion = {
            name: formData.get('name'),
            description: formData.get('description'),
            adultPrice: parseFloat(formData.get('adultPrice')),
            childPrice: parseFloat(formData.get('childPrice')),
        }
        
        if (!newExcursion.name || !newExcursion.description || 
            isNaN(newExcursion.adultPrice) || isNaN(newExcursion.childPrice)) {
            alert('Proszę wypełnić wszystkie pola poprawnie');
            return
        }
        
        try {
            await api.addExcursions(newExcursion)
            
            addForm.reset()
            loadExcursions()
            
            alert('Wycieczka została dodana pomyślnie!');
        } catch (err) {
            console.error('Błąd dodawania wycieczki:', err);
            alert('Nie udało się dodać wycieczki');
        }
    })
}