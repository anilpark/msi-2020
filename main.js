window.onload = loaded;

const categories = {
    get: () => JSON.parse(localStorage.getItem('categories')),
    set: (arr) => {
        localStorage.setItem('categories', JSON.stringify(arr))
    }
}

function API() {
    const URLs = {
        random : () =>' https://api.chucknorris.io/jokes/random',
        category : category => `https://api.chucknorris.io/jokes/random?category=${category}`,
        search : request => `https://api.chucknorris.io/jokes/search?query=${request}`
    }

    return {
        getJoke: async function(type, param){
            const res = await fetch(URLs[type]( param ) );
            return await res.json();
        },
        getCategories: async function() {
            const CATEGORIES_URL = 'https://api.chucknorris.io/jokes/categories';

            let res = await fetch(CATEGORIES_URL);
            return await res.json();
        }
    }
}

function Joke(joke, liked) {
    for(let key in joke) this[key] = joke[key];

    this.liked = liked || false;

    this.insert = () => {
        document.getElementById('jokeBox').append(new JokeComponent(this));
    }

    this.updateState = () => {
        let liked = JSON.parse( localStorage.getItem('liked') );
        if(!liked) liked = [];

        if(this.liked)
            liked.splice( liked.findIndex(item => item.id === joke.id), 1 );
        else
            liked.push(joke);

        this.liked = !this.liked;

        localStorage.setItem('liked', JSON.stringify(liked));
    }

    this.insertToLiked = () => {
        document.querySelector('.liked-jokes-box').append(new LikedJokeComponent(this));
    }

    this.removeFromLiked = () => {
        document.querySelector(`#joke-${joke.id}`).remove();
    }
}


function insertToLikedJokes(joke){
    document.querySelector('.liked-jokes-box').append(new LikedJokeComponent(joke));
}

function removeFromLiked(joke){
    document.querySelector(`#joke-${joke.id}`).remove();
}

function showJokes() {
    let way = document.forms.menu.menuRadio.value;

    const api = new API();

    api.getJoke(way, getParam()).then(res => {
        clearJokeBox();

        if(res.total) res.result.forEach(item => new Joke(item).insert())
        else new Joke(res).insert();
    })

    function getParam() {
        switch (way) {
            case 'category':
                return document.forms.categories.category.value;
            case 'search':
                return document.querySelector('#searchReq').value;
            default: return;
        }
    }
}

function insertLiked() {
    let liked = JSON.parse( localStorage.getItem('liked') );
    if(liked) liked.forEach(item => {
        let likedJoke = new Joke(item, true);
        likedJoke.insertToLiked();
    });
}

function clearJokeBox(){
    document.getElementById('jokeBox').innerHTML = '';
}

function clearCategories() {
    document.getElementById('categories-box').innerHTML = `
    <form name="categories">
    </form>
   `
}

function insertCategories(value) {
    let category = document.createElement('input'),
        label = document.createElement('label'),
        form = document.forms.categories;

    category.type = 'radio';
    category.name = 'category';
    category.value = value;

    label.innerHTML = value;
    label.prepend(category);
    form.append(label);
}

function test() {
    showJokes();
}

function loaded() {
    const api = new API();

    try {
        categories.get().forEach( item => {
            insertCategories(item);
        } );
    }finally {
        api.getCategories().then( res => {
                clearCategories();
                res.forEach( item => {
                    insertCategories(item);
                } );

                categories.set(res);
            }
        )
    }

    let btn = document.querySelector('#button');
    btn.onclick = showJokes;

    insertLiked();

    document.querySelector('.container').style.display = 'block';

    test();
}

function JokeComponent(obj) {
    function getJokeCategory() {
        if(this.categories[0]) return `
            <div class="joke-category">
                 <span>${obj.categories[0]}</span>
            </div>`;

        return '';
    }

    let component = document.createElement('div');
    let btn = document.createElement('button');

    btn.innerHTML = 'лайк'
    btn.onclick = function(){
        obj.updateState();
        if(obj.liked) obj.insertToLiked()
        else obj.removeFromLiked();
    }

    component.innerHTML = `
                <div class="joke-inner">
                    <div class="joke-id">
                        <a href="#">${obj.id}</a>
                    </div>
                    <div class="joke-text">
                        <span>${obj.value}</span>
                    </div>
                    <div class="joke-date">
                        <span>${obj.updated_at}</span>
                    </div>
                   ${getJokeCategory()}
                </div>
            `;
    component.className = 'joke-container';
    component.prepend(btn);

    return component;
}

function LikedJokeComponent(obj) {
    let component = document.createElement('div');
    let btn = document.createElement('button');
    btn.innerHTML = 'лайк'

    btn.onclick = function(){
        obj.updateState();
        if(obj.liked) obj.insertToLiked()
        else obj.removeFromLiked();
    }

    const content = `
        <div class="joke-inner">
            <div class="joke-text">
                <span>${obj.value}</span>
            </div>
        </div>
    `

    component.innerHTML = content;
    component.className = 'liked-joke-container';
    component.prepend(btn);
    component.id = `joke-${obj.id}`;

    return component;
}