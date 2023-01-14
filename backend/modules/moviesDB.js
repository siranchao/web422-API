
module.exports = class MoviesDB {
    constructor(movieModel) {
        // We don't have a `Movie` object until initialize() is complete
        this.Movie = movieModel;
    }

    // Pass the connection string to `initialize()`
    /*
    initialize(connectionString) {
        return new Promise((resolve, reject) => {
            const db = mongoose.createConnection(
                connectionString,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            );

            db.once('error', (err) => {
                reject(err);
            });
            db.once('open', () => {
                this.Movie = db.model("movies", movieSchema);
                resolve();
            });
        });
    }
    */

    async addNewMovie(data) {
        const newMovie = new this.Movie(data);
        await newMovie.save();
        return newMovie;
    }

    getAllMovies(page, perPage, title) {
        let findBy = title ? { title } : {};

        if (+page && +perPage) {
            return this.Movie.find(findBy).sort({ year: +1 }).skip((page - 1) * +perPage).limit(+perPage).exec();
        }

        return Promise.reject(new Error('page and perPage query parameters must be valid numbers'));
    }

    getMovieById(id) {
        return this.Movie.findOne({ _id: id }).exec();
    }

    updateMovieById(id, data) {
        return this.Movie.updateOne({ _id: id }, { $set: data }).exec();
    }

    deleteMovieById(id) {
        return this.Movie.deleteOne({ _id: id }).exec();
    }
}