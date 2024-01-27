document.addEventListener("DOMContentLoaded", () => {

console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

const dogBreedsUl = document.getElementById("dog-breeds")
const dropdown = document.getElementById("breed-dropdown")

const liNodesList = document.getElementsByClassName("breeds")


fetch(imgUrl)
    .then(response => response.json())
    .then(res => addsImages(res))
    .catch(error => console.log(error.message))

fetch(breedUrl)
    .then(response => response.json())
    .then(res => handleDogBreedList(res))
    .catch(error => console.log(error.message))

function addsImages(response) {
    const imagesArray = response.message
    imagesArray.forEach(element => {
        const img = document.createElement("img")
        img.setAttribute("src", element)
        img.setAttribute("alt", "Image of a Dog")    
        document.getElementById("dog-image-container").appendChild(img)
    })
};

function handleDogBreedList(response) {
    const breedNamesObj = response.message
    for(let breedKey in breedNamesObj) {
        const li = document.createElement("li")
        li.setAttribute("class", "breeds")
        li.textContent = breedKey

        dogBreedsUl.appendChild(li)
        li.addEventListener("click", (e => e.target.style.color = "red"))
    }
};

dropdown.addEventListener("change", event => {
    const dropdownOption = dropdown.value 
    deleteDogBreedList()
    fetchDogBreeds(dropdownOption)    
})

function deleteDogBreedList() {
    const liArray = Array.from(liNodesList)
    liArray.forEach(element => {
        dogBreedsUl.removeChild(element)
    })
}

function fetchDogBreeds(value) {
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        const keysArray = Object.keys(data.message)
        const filteredArray = keysArray.filter(breed => {
            if (breed[0] === value) {
                return breed
            }
        })
        filteredArray.forEach(element => {
            const li = document.createElement("li")
            li.setAttribute("class", "breeds")
            li.textContent = element

            dogBreedsUl.appendChild(li)
            li.addEventListener("click", (e => e.target.style.color = "red"))
        })
    })
}

});
//all code inside there, none after this!