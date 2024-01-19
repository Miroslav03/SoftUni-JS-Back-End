const movies = [{
    title: 'Harry Potter and the Deathly Hallows Part 1',
    genre: 'Action',
    director: 'David Yates',
    year: '2011',
    imageUrl: '/img/Harry Potter.jpeg',
    rating: '5',
    description: 'As Harry, Ron and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows.'
  }];

exports.create = (movieData) => {
    console.log(movieData);
    movies.push(movieData);
}