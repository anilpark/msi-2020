import {JokeComponent} from "./Components/JokeComponent.js";
import {LikedJokeComponent} from "./Components/LikedJokeComponent.js";

export class Joke {
    constructor(joke, liked) {
        for(let key in joke) this[key] = joke[key];

        this.liked = liked || false;
    }

    insert(){
        document.getElementById('jokeBox').append(new JokeComponent(this));
    }

    updateState(){
        let liked = JSON.parse( localStorage.getItem('liked') );
        if(!liked) liked = [];

        if(this.liked)
            liked.splice( liked.findIndex(item => item.id === this.id), 1 );
        else
            liked.push(this);

        this.liked = !this.liked;

        localStorage.setItem('liked', JSON.stringify(liked));
    }

    getJokeCategory() {
        if(this.categories[0]) return `
            <div class="joke-category">
                 <span>${obj.categories[0]}</span>
            </div>`;

        return '';
    }

    insertToLiked(){
        document.querySelector('.liked-jokes-box').append(new LikedJokeComponent(this));
    }

    removeFromLiked(){
        document.querySelector(`#liked-joke-${this.id}`).remove();
    }
}