const photoContainer = document.querySelector('.photos-grid');
const loader = document.querySelector('#loader');
const apiURL = "https://api.unsplash.com";
const acessKey = "RY7ItKwWONfZFG_AiVHiYcQVnJGhuER_9WDRd0zfunQ";
const count = 5;

window.onload = () => {
    getPhotos()
    displayPhotos();
};

const displayLoader = () => {
    loader.classList.add('active');
}
const hideLoader = () => {
    loader.classList.remove('active');
}
const getPhotos = async ()=> {
    displayLoader()
    let photos = [];
    return fetch(`${apiURL}/photos/random?client_id=${acessKey}&count=${count}`)
    .then ((response)=> response.json())
    .then (data => {
        photos.push(...data);
        hideLoader();
        return photos;
    })
    .catch( error => {
        console.log(error);
    });
}

const displayPhotos = async () => {
    let photos = await getPhotos();
    photos.forEach(photo => {
        console.log(photo);
        const element = document.createElement('div');
        element.classList.add('photo-item');

    });
}
