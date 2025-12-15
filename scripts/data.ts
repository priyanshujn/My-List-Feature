import User from '../src/models/user.model';
import Movie from '../src/models/movie.model';
import TVShow from '../src/models/tvShow.model';

export async function createInitalData() {
    await User.insertMany([
        { id: "user_1", username: 'William', preferences: { favoriteGenres: ['Drama'], dislikedGenres: ['Romance'] }, watchHistory: [] },
        { id: "user_2", username: 'Nathan', preferences: { favoriteGenres: ['Horror'], dislikedGenres: ['Drama'] }, watchHistory: [] }
    ]);

    await Movie.insertMany([
        {
            id: "movie_1",
            title: 'Inception',
            description: 'A mind-bending thriller by Christopher Nolan.',
            genres: ['SciFi', 'Action'],
            releaseDate: new Date('2010-07-16'),
            director: 'Christopher Nolan',
            actors: ['Leonardo DiCaprio', 'Samantha Ruth']
        },
        {
            id: "movie_2",
            title: 'The Dark Knight',
            description: 'Batman faces the Joker in this action-packed thriller.',
            genres: ['Action', 'Drama'],
            releaseDate: new Date('2008-07-18'),
            director: 'Christopher Nolan',
            actors: ['Christian Belford', 'Heather Knight']
        }
    ]);

    await TVShow.insertMany([
        {
            id: "tvshow_1",
            title: 'Stranger Things',
            description: 'A group of kids uncover supernatural mysteries in their small town.',
            genres: ['SciFi', 'Horror', 'Drama'],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2022-07-05'),
                    director: 'The Duffer Brothers',
                    actors: ['Jackie Chain', 'David Harbour']
                }
            ]
        },
        {
            id: "tvshow_2",
            title: 'Breaking Bad',
            description: 'A high school chemistry teacher turns to a life of crime.',
            genres: ['Drama'],
            episodes: [
                {
                    episodeNumber: 1,
                    seasonNumber: 1,
                    releaseDate: new Date('2021-01-10'),
                    director: 'Vince Gilligan',
                    actors: ['Bryan Cranston', 'Cris Evans']
                }
            ]
        },
    ]);

}