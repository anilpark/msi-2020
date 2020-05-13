export function JokeComponent(obj) {
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