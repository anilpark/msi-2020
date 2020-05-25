import {JokeComponent} from "./Components/JokeComponent.js";
import {LikedJokeComponent} from "./Components/LikedJokeComponent.js";

export class Joke {
    constructor(joke, liked) {
        for(let key in joke) this[key] = joke[key]; //we don't expect unused fields from API

        this.liked = liked || false;
    }

    insert(){
        document.getElementById('jokeBox').append(new JokeComponent(this));
    }

    getLastUpdate(){
        //need rewrite: doesn't work in safari
        return Math.round( +Date.now()/(3600*1000) - (+new Date(this.updated_at))/(3600*1000) );
    }

    updateLikedState(){
        let liked = JSON.parse( localStorage.getItem('liked') );
        if(!liked) liked = [];

        if(this.liked)
            liked.splice( liked.findIndex(item => item.id === this.id), 1 );
        else
            liked.push(this);

        this.liked = !this.liked;

        localStorage.setItem('liked', JSON.stringify(liked));

        $(`#joke-${this.id} .heart`).toggleClass('filled');
    }

    getJokeCategory() {
        return this.categories[0] || false;
    }

    insertToLikedList(){
        document.querySelector('.liked-jokes-box').append(new LikedJokeComponent(this));
    }

    removeFromLikedList(){
        document.querySelector(`#liked-joke-${this.id}`).remove();
    }
}