const express = require('express')
const router = express.Router()
const { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require('../controller/movieController')

//add a new movie
router.post('/', addMovie)

//fetch selected movies
router.get('/', getMovies)

//fetch a movie by id
router.get('/:id', getMovieById)

//update a movie by id
router.put('/:id', updateMovie)

//delete a movie
router.delete('/:id', deleteMovie)



module.exports = router