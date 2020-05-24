import {Joke} from "./Joke.js";

window.onload = loaded;

$('.burger').on('click', function(e) {
    e.preventDefault;
    $(this).toggleClass('burger-active');
    $('.favourite-inner').toggleClass('shown');
    $('.main-container').toggleClass('hidden');
    $('.bg-shadow').toggleClass('shown');
});

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

function showJokes() {
    let way = document.forms.form.way.value;

    const api = new API();

    api.getJoke(way, getParam()).then(res => {
        clearJokeBox();

        if(res.total) res.result.forEach(item => new Joke(item).insert())
        else new Joke(res).insert();
    })

    function getParam() {
        switch (way) {
            case 'category':
                return document.forms.form.category.value;
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
        likedJoke.insertToLikedList();
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
    let input = document.createElement('input');
    let div = document.querySelector('#categories-box');
    let label = document.createElement('label');

    input.type = 'radio';
    input.id = `cat-${value}`
    input.name = 'category';
    input.value = value;

    label.innerHTML = value;
    label.setAttribute('for',  `${input.id}`);
    div.append(input);
    div.append(label);
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

    let btn = document.querySelector('.get-joke-btn');
    btn.onclick = showJokes;

    insertLiked();

    document.querySelector('.container').style.display = 'block';

    test();
}
