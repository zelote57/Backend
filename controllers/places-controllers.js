const uuid = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];

// function getPlaceById(){...}
// const getPlaceById = function () {...}

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })

    if (!place) {
        const error = new HttpError('Could not find a place for the provider id.', 404);
        error.code = 404;
        throw error;
    }

    res.json({ place });
};

const getPlacesByUserId  = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })

    if (!places || places.length === 0) {
        const error = new Error('Could not find a places for the provider user id.');
        error.code = 404;
        return next(error);
    }

    res.json({ places });
};

const createPlace = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw new HttpError('Invalid input passed, please check your data', 422)
    }

    const { title, description, coordinates, address, creator } = req.body;
    // const title = req.body.title;

    const createdPlace = {
        id : uuid.v4(),        
        title : title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201) //means created
    .json({place:createdPlace});
};

const updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;
    
    const updatedPlace = {... DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted Place'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;