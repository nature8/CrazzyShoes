// const expressJwt = require('express-jwt');

// function authJwt() {
//     const secret = process.env.secret; // Use SECRET_KEY
//     const api = process.env.API_URL;

//     return expressJwt({
//         secret,
//         algorithms: ['HS256'],
//         isRevoked: isRevoked
//     }).unless({
//         path: [
//             { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
//             { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
//             { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
//             { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
//             `${api}/users/login`,
//             `${api}/users/register`,
//         ]
//     });
// }

// async function isRevoked(req, payload, done) {
//     if (!payload.isAdmin) {
//         return done(null, true); // Token is revoked if user is not admin
//     }
//     done(); // Token is not revoked if user is admin
// }

// module.exports = authJwt;


const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET_KEY; // Ensure the correct environment variable is used
    const api = process.env.API_URL;

    // Check if the secret key is set in the environment
    if (!secret) {
        throw new Error('JWT secret (SECRET_KEY) is not set in environment variables');
    }

    // Middleware to check if the JWT token is valid
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked, // Custom function to check if token is revoked
    }).unless({
        // Exclude specific routes from JWT authentication
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] }, // Public uploads
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] }, // Public products
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] }, // Public categories
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] }, // Public orders (GET and POST)
            `${api}/users/login`, // Allow public access to login
            `${api}/users/register`, // Allow public access to register
        ],
    });
}

// Function to check if a token is revoked (if user is not an admin)
async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        return done(null, true);  // Revoke the token if user is not an admin
    }
    done(); // Allow the token if the user is an admin
}

module.exports = authJwt;



// const expressJwt = require('express-jwt');

// function authJwt() {
//     const secret = process.env.SECRET_KEY; // Ensure SECRET_KEY is accessed correctly
//     const api = process.env.API_URL;

//     if (!secret) {
//         throw new Error('SECRET_KEY is not defined in environment variables');
//     }

//     return expressJwt({
//         secret,
//         algorithms: ['HS256'],
//         isRevoked: isRevoked
//     }).unless({
//         path: [
//             { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
//             { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
//             { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
//             { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
//             `${api}/users/login`,
//             `${api}/users/register`,
//         ]
//     });
// }

// async function isRevoked(req, payload, done) {
//     if (!payload.isAdmin) {
//         return done(null, true); // Token is revoked if user is not admin
//     }
//     done(); // Token is not revoked if user is admin
// }

// module.exports = authJwt;
