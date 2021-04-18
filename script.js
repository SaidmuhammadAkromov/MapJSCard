function showModal(block) {
    var modal = document.getElementById('modal')
    modal.style.display = 'block'
}
function closeModal(block) {
    var modal = document.getElementById('modal')
    modal.style.display = 'none'
    block.style.display = 'none'
}
function handleClickAdd() {
    var nameInput = document.getElementById('nameInput')
    var costInput = document.getElementById('costInput')
    var addFileInput = document.getElementById('fileInput')
    var file = addFileInput.files[0]
    var mymap = document.getElementById('mymap')
    mymap.addEventListener('click', function (e) {
        console.log(e);
    })
    

    // var cardAddress = document.createElement('p')
    // cardAddress.classList.add('a')
    // cardAddress.classList.add('btn-primary')
    // cardAddress.innerText = marker._latlng.lat + marker._latlng.lng
    // cardBody.append(cardAddress)
    createCard(nameInput.value, costInput.value, URL.createObjectURL(file), marker._latlng.lat , marker._latlng.lng)
    createObj(nameInput.value, costInput.value, URL.createObjectURL(file), marker._latlng.lat ,marker._latlng.lng )
    var card = createObj(nameInput.value, costInput.value, URL.createObjectURL(file), marker._latlng.lat ,marker._latlng.lng)
    writeToLS(card)
}
function createObj(title, cost, imageSrc, addressLat, addressLng, index) {
    var card = {
        title,
        cost,
        imageSrc, 
        addressLat,
        addressLng,
        index
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
var index = 0
function createCard(title, cost, imageSrc, addressLat, addressLng) {
    var container = document.getElementById('container')

    var card = document.createElement('div')
    card.classList.add('card')
    container.append(card)

    var cardImage = document.createElement('img')
    cardImage.classList.add('card-image-top')
    cardImage.src = imageSrc
    card.append(cardImage)

    var cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    card.append(cardBody)

    var cardName = document.createElement('h5')
    cardName.classList.add('card-title')
    cardName.innerText = title
    cardBody.append(cardName)

    var cardCost = document.createElement('p')
    cardCost.classList.add('card-title')
    cardCost.innerText = cost
    cardBody.append(cardCost)

    var cardAddressLat = document.createElement('a')
    cardAddressLat.classList.add('btn-primary', 'btn')
    cardAddressLat.innerText = addressLat
    cardBody.append(cardAddressLat)

    var cardAddressLng = document.createElement('a')
    cardAddressLng.classList.add('btn-primary', 'btn')
    cardAddressLng.innerText = addressLng
    cardBody.append(cardAddressLng)

    var editBtn = document.createElement('button')
    editBtn.classList.add('btn', 'btn-secondary', 'editBtn')
    editBtn.innerText = 'Edit'
    editBtn.addEventListener('click', handleEditBtn)
    cardBody.append(editBtn)

    var indexOfCards = document.createElement('span')
    indexOfCards.innerText = index++
    cardBody.append(indexOfCards)
}
function createCardOfLS() {
    var items = JSON.parse(localStorage.getItem('items'))
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        createCard(item.title, item.cost, item.imageSrc, item.addressLat, item.addressLng)
    }
}
function click(e) {
    var lat1 = e.latlng.lat;
    var lng1 = e.latlng.lng;


    marker.setLatLng([lat1, lng1])
}

    var mymap = L.map('mymap').setView([41.311081, 69.240562], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FpZG11aGFtbWFkYWtyb21vdiIsImEiOiJja25hZjBudnAxaDQ4MnhwOXE4dmZ6bjVzIn0.ppLFtGB0JSKeX8gUqLyAVw', {
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    var marker = L.marker([41.311081, 69.240562]).addTo(mymap)
    
function showEditModal() {
    var editModal = document.getElementById('editModal')
    editModal.style.display = 'block'
}    

function getElementsToEditModal(editbutton) {
    var cards = document.getElementsByClassName('card')
    var parentElement = editbutton.parentElement
    var editTitleInput = document.getElementById('editNameInput')
    var editCostInput = document.getElementById('editCostInput')
    var indexOfCard = document.getElementById('indexOfCard')

    mymap2.setView([parentElement.children[2].innerText, parentElement.children[3].innerText])
    marker2.setLatLng([parentElement.children[2].innerText, parentElement.children[3].innerText])
    indexOfCard.innerText = parentElement.children[5].innerText
    editTitleInput.value = parentElement.firstElementChild.innerText
    editCostInput.value  = parentElement.children[1].innerText
}

function handleEditBtn() {
    showEditModal()
    getElementsToEditModal(this)
} 
var mymap2 = L.map('editMymap').setView([41.311081, 69.240562], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FpZG11aGFtbWFkYWtyb21vdiIsImEiOiJja25hZjBudnAxaDQ4MnhwOXE4dmZ6bjVzIn0.ppLFtGB0JSKeX8gUqLyAVw', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap2);
var marker2 = L.marker([41.311081, 69.240562]).addTo(mymap2)

function editCard() {
    var editNameInput = document.getElementById('editNameInput')
    var editCostInput = document.getElementById('editCostInput')
    var indexOfCard = document.getElementById('indexOfCard').innerText
    var cards = document.getElementsByClassName('card-body')
    var addressLat = cards[indexOfCard].children[2].innerText
    var addressLng = cards[indexOfCard].children[3].innerText
    var address = [addressLat, addressLng]
    
    console.log(address);

    cards[indexOfCard].children[0].innerText = editNameInput.value
    cards[indexOfCard].children[1].innerText = editCostInput.value

    var items = JSON.parse(localStorage.getItem('items'))
    localStorage.setItem('items',JSON.stringify(items))
    var cardObj = createObj(cards[indexOfCard].children[0].innerText, cards[indexOfCard].children[1].innerText, " ",addressLat, addressLng)
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
        handleClickAdd()
    })

    var choosePhotoBtn = document.getElementById('choosePhoto')
    choosePhotoBtn.addEventListener('click', function(){
        document.getElementById('fileInput').click()
    })

    mymap.on('click', click);
    mymap2.on('click', click)
    createCardOfLS();

    var editCloseModalBtnX = document.getElementById('editCloseModalBtnX')
    editCloseModalBtnX.addEventListener('click', function () {
        closeModal(document.getElementById('editModal'))
    })

    var editCloseModalBtn = document.getElementById('editCloseModalBtn')
    editCloseModalBtn.addEventListener('click', function () {
        closeModal(document.getElementById('editModal'))
    })

    var editBtn = document.getElementById('editBtn')
    editBtn.addEventListener('click', function(){
        editCard()
    })

})