import express from 'express';
import booksRouter from './bookRoutes.js';
import authorRouter from './authorRoute.js';

const routes = (app) => {
    app.use(
        express.json(),
        booksRouter,
        authorRouter
    )
}

export default routes;