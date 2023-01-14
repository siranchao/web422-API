//use middleware to replace try..catch.. block
const asyncHandler = require('express-async-handler');

//import Movie model
const MovieModel = require('../models/movieModel')

//import methods from Movies Module
const MoviesDB = require('../modules/moviesDB')
const movies = new MoviesDB(MovieModel);



//@controller: add a new movie
//@route POST /api/movies
const addMovie = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error('Please check request body')
    }

    const newMovie = await movies.addNewMovie(req.body)
    res.status(201).json({
        message: "New movie added",
        data: newMovie
    })
})


//@controller: fetch selected movies
//@route GET /api/movies
const getMovies = asyncHandler(async (req, res) => {
    const query = await movies.getAllMovies(req.query.page, req.query.perPage, req.query.title)

    if (query.length === 0) {
        res.status(400)
        throw new Error('Movie not found')
    }

    res.status(200).json({
        message: "Selected movies found",
        data: query
    })
})

//@controller: fetch a movie by id
//@route GET /api/movies/:id
const getMovieById = asyncHandler(async (req, res) => {
    const query = await movies.getMovieById(req.params.id)

    if (!query) {
        res.status(400)
        throw new Error('Movie not found')
    }

    res.status(200).json({
        message: "Movie found",
        data: query
    })
})

//@controller: update a movie by id
//@route PUT /api/movies/:id
const updateMovie = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error('Please check request body')
    }

    const query = await movies.getMovieById(req.params.id)

    if (!query) {
        res.status(400)
        throw new Error('Movie not found')
    }

    const update = await movies.updateMovieById(req.params.id, req.body)
    res.status(200).json({
        message: 'Movie Updated',
        data: update
    })
})

//@controller: delete a movie
//@route DELETE /api/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {
    const query = await movies.getMovieById(req.params.id)

    if (!query) {
        res.status(400)
        throw new Error('Movie not found')
    }

    await movies.deleteMovieById(req.params.id)
    res.status(200).json({
        message: 'Movie Deleted',
        data: null
    })
})

module.exports = { addMovie, getMovies, getMovieById, updateMovie, deleteMovie }