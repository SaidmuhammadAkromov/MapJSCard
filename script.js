function showModal() {
    var modal = document.getElementById('modal')
    modal.style.display = 'block'
}
function closeModal() {
    var modal = document.getElementById('modal')
    modal.style.display = 'none'
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
    createCard(nameInput.value, costInput.value, URL.createObjectURL(file), )
    createObj(nameInput.value, costInput.value, URL.createObjectURL(file))
    var card = createObj(nameInput.value, costInput.value, URL.createObjectURL(file))
    writeToLS(card)
}
function createObj(title, cost, imageSrc, address) {
    var card = {
        title,
        cost,
        imageSrc, 
        address
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
function createCard(title, cost, imageSrc, address) {
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

    var cardAddress = document.createElement('a')
    cardAddress.classList.add('btn-primary')
    cardAddress.innerText = address
    cardBody.append(cardAddress)
}
function createCardOfLS() {
    var items = JSON.parse(localStorage.getItem('items'))
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        createCard(item.title, item.cost, item.imageSrc)
    }
}
function initMap() {
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

    return mymap;
}
window.addEventListener('load', function () {
    var showModalBtn = document.getElementById('showModalBtn')
    showModalBtn.addEventListener('click', function () {
        showModal()
        initMap()
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

    createCardOfLS()


})