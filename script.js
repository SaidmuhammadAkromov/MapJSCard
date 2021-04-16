function showModal() {
    var modal = document.getElementById('modal')
    modal.style.display = 'block'
}
function closeModal() {
    var modal = document.getElementById('modal')
    modal.style.display = 'none'
}
function createCard() {
    var addFileInput = document.getElementById('fileInput')
    var file = addFileInput.files[0]
    var nameInput = document.getElementById('nameInput')
    var container = document.getElementById('container')
    var card = document.createElement('div')
    var costInput = document.getElementById('costInput')
    card.classList.add('card')
    container.append(card)

    var cardImage = document.createElement('img')
    cardImage.classList.add('card-image-top')
    cardImage.src = URL.createObjectURL(file)
    card.append(cardImage)

    var cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    card.append(cardBody)

    var cardName = document.createElement('h5')
    cardName.classList.add('card-title')
    cardName.innerText = nameInput.value
    cardBody.append(cardName)

    var cardCost = document.createElement('p')
    cardCost.classList.add('card-title')
    cardCost.innerText = costInput.value
    cardBody.append(cardCost)

    // var cardAddress = document.createElement('p')
    // cardAddress.classList.add('a')
    // cardAddress.classList.add('btn-primary')
    // cardAddress.innerText = marker._latlng.lat + marker._latlng.lng
    // cardBody.append(cardAddress)

    createObj(cardName.innerText, cardCost.innerText)
    var card = createObj(cardName.innerText, cardCost.innerText)
    writeToLS(card)
}
function createObj(title, cost) {
    var card = {
        title,
        cost
    }
    // console.log((card));
    return card;
}
function writeToLS(item) {
    var items = []

        var result = localStorage.getItem('items')

        if (!result) {
            result = []
        } else {
            items = JSON.parse(result)
        }

        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
}
function createCardOfLS() {
    var items = JSON.parse(localStorage.getItem('items'))
    console.log(items);
}
window.addEventListener('load', function () {
    var showModalBtn = document.getElementById('showModalBtn')
    showModalBtn.addEventListener('click', function () {
        showModal()
    })
    var closeModalBtn = document.getElementById('closeModalBtn')
    closeModalBtn.addEventListener('click', function () {
        closeModal()
    })
    var closeModalBtnX = document.getElementById('closeModalBtnX')
    closeModalBtnX.addEventListener('click', function () {
        closeModal()
    })

    var addBtn = document.getElementById('addBtn')
    addBtn.addEventListener('click', function(){
        createCard()
    })

    var choosePhotoBtn = document.getElementById('choosePhoto')
    choosePhotoBtn.addEventListener('click', function(){
        document.getElementById('fileInput').click()
    }) 

    createCardOfLS()


})