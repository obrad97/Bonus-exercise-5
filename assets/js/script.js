const photoContainer = document.querySelector('.photos-grid');
const button = document.getElementById('btn');
const gridView = document.getElementById('grid-view');
const listView = document.getElementById('list-view');
const tiwtterURL = "https://twitter.com/";
const instagramURL = "https://www.instagram.com/";
const loader = document.querySelector('#loader');
const apiURL = "https://api.unsplash.com";
const acessKey = "7af4fbd7b2d9792e76b52df48195b739567943bd8cccda6792e96c4c68e71a49";
/*my key RY7ItKwWONfZFG_AiVHiYcQVnJGhuER_9WDRd0zfunQ  random key1-7af4fbd7b2d9792e76b52df48195b739567943bd8cccda6792e96c4c68e71a49 random key2-783f46460ebede7f21f34b84eb80206e27d042af75812821ffbcd17828afee3f*/
const count = 8;

listView.addEventListener('click', ()=> {
    photoContainer.classList.add('photos-list');
})

gridView.addEventListener('click', ()=> {
    photoContainer.classList.remove('photos-list');
})

window.addEventListener('resize', ()=> {
    if (window.innerWidth < 850){
        photoContainer.classList.remove('photos-list');
    }
})

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
    photos.forEach((photo) => {
        console.log(photo);
        const element = document.createElement('div');
        element.classList.add('photo-item');
        const checkIfNull = (param) => {
            if (param == null){
                return "Not available"
            }else {
                return param
            }
        }
        element.innerHTML = 
        `<div class="photo">
            <a href="${photo.links.html}" target="_blank">
            <img src="${photo.urls.regular}" alt="${photo.alt_description}"/></a>
            </div>
            <div class="info">
                <div class="info-top">
                    <div class="avatar-name">
                        <a href="${photo.user.links.html}" target="_blank"><img class="avatar" src="${photo.user.profile_image.large}" alt="user-img"/></a>
                <div class="name">
                    <h3>${photo.user.first_name} ${photo.user.last_name}</h3>
                    <a href="${photo.user.links.html}" target="_blank">@${photo.user.username}</a>
                </div>
                
            </div>
        </div>
        <div class="info-mid">
            <p class="bio">${(photo.user.bio == null)? "No bio available" : photo.user.bio}</p>
            <div class="likes-download">
                    <div class="likes">
                        <img class="likes-img" src="images/heart.svg" alt="likes-icon"/>
                        <p>${photo.likes}</p>
                    </div>
                    <div class="downloads">
                        <img class="downloads-img" src="images/download.svg" alt="downloads-icon"/>
                        <p>${photo.downloads}</p>
                    </div>
                    <div class="views">
                        <img class="views-img" src="images/eye.svg" alt="views-icon"/>
                        <p>${photo.views}</p>
                    </div>
                </div>
        </div>
        <div class="info-bottom">
            <div class="instagram">
                <img
                    class="instagram-ico"
                    src="images/instagram.svg"
                />
                <a 
                ${(photo.user.instagram_username == null)?
                    'style="color:black;"'
                    : 'href="'+instagramURL+photo.user.instagram_username+'" target="_blank"'} 
                    class="twitter-link">${checkIfNull(photo.user.instagram_username)} 
                </a>
            </div>
            <div class="twitter">
                <img
                    class="twitter-ico"
                    src="images/twitter.svg"
                />
                <a 
                ${(photo.user.twitter_username == null)? 
                    'style="color:black;"' 
                    : 'href="'+tiwtterURL+photo.user.twitter_username+'" target="_blank"'} 
                    class="twitter-link">${checkIfNull(photo.user.twitter_username)}
                </a>
            </div>
            <div class="portfolio">
                <img
                    class="portfolio-ico"
                    src="images/portfolio.svg"
                />
                <a ${(photo.user.portfolio_url == null)? 'style="color:black;"'
                    : 'href="'+photo.user.portfolio_url+'" target="_blank"'}
                class="portfolio-link">${(photo.user.portfolio_url == null)? "Not available" : 'Portfolio'}</a>
            </div>
        </div>
    </div>`
        photoContainer.appendChild(element);
    });
}

button.addEventListener('click', (e)=> {
    button.style.display = 'none';
    loader.classList.add('bottom-loader');
    setTimeout(() => {
        getPhotos();
        hideLoader();
    }, 1500)
    setTimeout(() => {
        button.style.display = 'block';
    }, 2000);
})

getPhotos();

