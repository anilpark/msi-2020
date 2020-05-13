export function LikedJokeComponent(obj) {
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
            <div class="joke-text">
                <span>${obj.value}</span>
            </div>
        </div>`;
    component.className = 'liked-joke-container';
    component.prepend(btn);
    component.id = `liked-joke-${obj.id}`;

    return component;
}

function insertToLikedJokes(joke){
    document.querySelector('.liked-jokes-box').append(new LikedJokeComponent(joke));
}

function removeFromLiked(joke){
    document.querySelector(`#liked-joke-${joke.id}`).remove();
}
