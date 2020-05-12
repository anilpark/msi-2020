

function LikedJokeComponent(joke) {
    let component = document.createElement('div');
    let btn = document.createElement('button');
    btn.innerHTML = 'лайк'

    btn.onclick = function(){
        updateJoke(joke);
    }

    const content = `
        <div class="joke-inner">
            <div class="joke-text">
                <span>${joke.value}</span>
            </div>
        </div>
    `

    component.innerHTML = content;
    component.className = 'liked-joke-container';
    component.prepend(btn);
    component.id = `joke-${joke.id}`;

    return component;
}