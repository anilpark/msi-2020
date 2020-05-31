import {FoundJokeComponent} from "./JokeComponent.js";
import {LikedJokeComponent} from "./JokeComponent.js";
import {ErrorJokeComponent} from "./JokeComponent.js";

export class Joke {
    constructor(joke) {
        for(let key in joke) this[key] = joke[key]; //we don't expect unused fields from API

        //checking if the joke is already liked;
        const liked = JSON.parse( localStorage.getItem('liked') );
        if(liked) liked.forEach(item => {
            if(item.id === this.id) this.liked = item.liked;
        });
    }

    insert(){
        document.querySelector('.found-jokes-box').append(new FoundJokeComponent(this));
    }

    insertError(){
        document.querySelector('.found-jokes-box').append(new ErrorJokeComponent(this));
    }

    getLastUpdate(){
        const ONE_HOUR = 3600*1000;

        //without 'replace' doesn't work in safari
        return Math.round( +Date.now()/ONE_HOUR - (+Date.parse(this.updated_at.replace(/ /g,"T")))/ONE_HOUR );
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
        document.querySelector('.favourite-inner').append(new LikedJokeComponent(this));
    }

    removeFromLikedList(){
        document.querySelector(`#liked-joke-${this.id}`).remove();
    }
}