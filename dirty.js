function insertJoke(joke) {
    document.getElementById('jokeBox').append(new JokeComponent(joke));
}




// if(joke.liked){
//     let found = liked.findIndex(item => item.id === joke.id);
//     liked.splice(found, 1);
//     joke.liked = false;
//     removeFromLiked(joke);
// }else {
//     joke.liked = true;
//     liked.push(joke);
//     insertToLikedJokes(joke);
// }