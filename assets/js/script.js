const photoContainer = document.querySelector('.photos-grid');
const columns = document.querySelectorAll('.column');
const button = document.getElementById('btn');
const loader = document.querySelector('#loader');
const apiURL = "https://api.unsplash.com";
const acessKey = "783f46460ebede7f21f34b84eb80206e27d042af75812821ffbcd17828afee3f";
/*my key RY7ItKwWONfZFG_AiVHiYcQVnJGhuER_9WDRd0zfunQ  random key1-7af4fbd7b2d9792e76b52df48195b739567943bd8cccda6792e96c4c68e71a49 random key2-783f46460ebede7f21f34b84eb80206e27d042af75812821ffbcd17828afee3f*/
const count = 8;

const displayLoader = () => {
    loader.classList.add('active');
}
const hideLoader = () => {
    loader.classList.remove('active');
    loader.classList.remove('bottom-loader');
}
const getPhotos = async ()=> {
    displayLoader()
    let photos = [];
    fetch(`${apiURL}/photos/random?client_id=${acessKey}&count=${count}`)
    .then ((response)=> response.json())
    .then (data => {
        photos.push(...data);
        hideLoader();
        displayPhotos(photos);
    })
    .catch( error => {
        console.log(error);
    });
}

const displayPhotos = (photos) => {
    photos.forEach((photo, index) => {
        console.log(photo);
        const element = document.createElement('div');
        element.classList.add('photo-item');
        element.innerHTML = 
        `<div class="photo">
        <img
            src="${photo.urls.regular}"
            alt=""
        />
    </div>
    <div class="info">
        <div class="info-top">
            <div class="avatar-name-likes">
                <img
                    class="avatar"
                    src="images/futuristic-city-sunset-wallpaper.jpg"
                />
                <div class="name">
                    <h3>John Doe</h3>
                    <a href="#">username</a>
                </div>
                <div class="likes-download">
                    <img
                        class="likes-img"
                        src="images/heart.svg"
                    />
                    <p class="likes">123</p>
                    <img
                        class="downloads-img"
                        src="images/download.svg"
                    />
                    <p class="downloads">123</p>
                </div>
            </div>
        </div>
        <div class="info-mid">
            <p class="bio-head">Bio</p>
            <p class="bio">
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Dolorem saepe amet aspernatur
                sint. Itaque dolores ipsum ipsa atque
                voluptatibus consequatur tempore incidunt quos
                molestias? Reiciendis esse totam fuga ipsam
                illum.
            </p>
        </div>
        <div class="info-bottom">
            <div class="instagram">
                <img
                    class="instagram-ico"
                    src="images/instagram.svg"
                />
                <a href="#" class="instagram-link">instagram</a>
            </div>
            <div class="twitter">
                <img
                    class="twitter-ico"
                    src="images/twitter.svg"
                />
                <a href="#" class="twitter-link">twitter</a>
            </div>
            <div class="portfolio">
                <img
                    class="portfolio-ico"
                    src="images/portfolio.svg"
                />
                <a href="#" class="portfolio-link">portfolio</a>
            </div>
        </div>
    </div>`
        
        if (index > 3){
            columns[index-4].appendChild(element);
        }else {
            columns[index].appendChild(element);
        }
    });
}

button.addEventListener('click', (e)=> {
    button.style.display = 'none';
    loader.classList.add('bottom-loader');
    setTimeout(function() {
        getPhotos();
        hideLoader();
        button.style.display = 'block';
    }, 1500)
})

getPhotos();

