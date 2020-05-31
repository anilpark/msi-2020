import {Joke} from "./Joke.js";
const ONE_HOUR = 3600*1000;
const errJoke = {
    categories: [],
    created_at: "2020-01-05 13:42:25.352697",
    icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    id: "Opps, something went wrong",
    error: true,
    updated_at: "2022-01-05 13:42:25.352697",
    url: "https://api.chucknorris.io/jokes/DlVTalYbSIew7VHzXrZ5JA",
    value: "Only Chuck Norris can laugh at jokes about Chuck Norris"
}

function API() {
    const URLs = {
        random : () => 'https://api.chucknorris.io/jokes/random',
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

function findJokes(type, param) {
    const api = new API();

    api.getJoke(type, param).then(res => {
        clearJokeBox();

        try{
            if(res.total) res.result.forEach(item => new Joke(item).insert())
            else new Joke(res).insert();
        }catch (e) {
            new Joke(errJoke).insertError();
        }
    })
}

function insertLiked() {
    const liked = JSON.parse( localStorage.getItem('liked') );
    if(liked) liked.forEach(item => {
        let likedJoke = new Joke(item);
        likedJoke.insertToLikedList();
    });
}

function insertCategory(value) {
    let input = document.createElement('input');
    let div = document.querySelector('.categories-box');
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

function clearJokeBox(){
    document.querySelector('.found-jokes-box').innerHTML = '';
}

function loaded() {
    const api = new API();

    api.getCategories().then( res => {
        res.forEach( item => {
            insertCategory(item);
        } );
        document.forms.form.category[0].checked = true;
    });

    $('.burger').on('click', function() {
        $(this).toggleClass('burger-active');
        $('.favourite-section').toggleClass('shown');
        $('.main-container').toggleClass('hidden');
        $('.bg-shadow').toggleClass('shown');
    });

    $("form").on("submit", function(e){
        e.preventDefault();

        const type = document.forms.form.type.value;
        const param = type !== 'random' ? document.forms.form[type].value : 'random';

        findJokes(type, param);
    });

    //submit is allowed when the input is empty despite on 'minlength'
    $("form").on("change", function(){
        const type = document.forms.form.type.value;
        document.forms.form.search.required = type === 'search';
    });

    insertLiked();
    setInterval(insertLiked, ONE_HOUR); //to update 'last_upd' in favourites
}

window.onload = loaded;