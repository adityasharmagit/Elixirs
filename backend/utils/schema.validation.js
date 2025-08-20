const Joi = require("joi");

const wallpaperSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().max(1000).allow(""),
    category: Joi.string()
        .valid("Nature", "Anime", "Abstract", "Technology", "Space", "Gaming", "Minimal", "City", "Cars", "Animals", "Fantasy", "Sports", "Movies")
        .required(),
});

module.exports =  wallpaperSchema;