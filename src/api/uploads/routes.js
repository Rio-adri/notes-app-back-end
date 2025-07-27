const path = require('path');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/uploads/images',
        handler: handler.postUploadImageHandler,
        options: {
            auth: 'notesapp_jwt',
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                output: 'stream',
            }
        }
    },
    {
        method: 'GET',
        path: 'upload/{param*}',
        handler: {
            directory: {
                path: path.resolve(__dirname, 'file');
            }
        }
    }
];

module.exports  = routes;