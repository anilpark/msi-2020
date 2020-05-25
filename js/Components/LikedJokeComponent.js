export class LikedJokeComponent {
    constructor(obj){
        this.$el = document.createElement('div');

        this.$categoryEl = '';
        if (obj.getJokeCategory()) this.$categoryEl = `
            <div class="joke-category">${obj.getJokeCategory()} </div>`

        this.$el.innerHTML = `
                <div class="joke-icon">
                        <img src="${obj.icon_url}" alt="">
                 </div>
                <div class="joke-inner">
                    <div class="joke-id">
                       <span class="grey-text">ID:</span><a target="_blank" href="https://api.chucknorris.io/jokes/${obj.id}">${obj.id}</a>
                    </div>
                    <div class="joke-text">
                        <span>${obj.value}</span>
                    </div>
                    <div class="joke-inner-bottom">
                        <div class="joke-date">
                            <span class="grey-text">Last update: <strong class="grey-text">${obj.getLastUpdate()} hours ago</strong></span>
                        </div>
                       ${this.$categoryEl}
                    </div>
                </div>`;

        this.$like = document.createElement('div');

        this.$like.innerHTML = `
            <svg class="heart filled">
                 <use  xlink:href="images/heart.svg#heart-icon"></use>
            </svg>`;

        this.$like.className = 'heart-wrapper';
        this.$like.onclick = function () {
            obj.updateLikedState();
            if (obj.liked) obj.insertToLikedList();
            else obj.removeFromLikedList();
        }

        this.$el.className = 'liked-joke-container';
        this.$el.id = `liked-joke-${obj.id}`; //for removing

        this.$el.prepend(this.$like);

        return this.$el;
    }
}