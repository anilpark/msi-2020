import {LikedJokeComponent} from "./LikedJokeComponent.js";

export class JokeComponent {
    constructor(obj) {
        this.$component = document.createElement('div');
        this.$btn = document.createElement('button');

        this.$btn.innerHTML = 'лайк'
        this.$btn.onclick = function(){
            obj.updateState();
            if(obj.liked) obj.insertToLiked();
            else obj.removeFromLiked();
        }

        this.$component.innerHTML = `
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
                   ${ obj.getJokeCategory() }
                </div>
            `;
        this.$component.className = 'joke-container';
        this.$component.prepend(this.$btn);

        return this.$component;
    }


}