import { resolve } from 'path';

export const entry = './app.js';
export const output = {
    path: resolve(__dirname, 'dist'), // The output directory
    filename: 'bundle.js' // The name of the bundled file
};
export const module = {
    rules: [
        {
            test: /\.js$/, // Match JavaScript files
            exclude: /node_modules/, // Exclude the node_modules directory
            use: {
                loader: 'babel-loader' // Use Babel for JavaScript transpilation
            }
        },
        // Add more rules for other file types (e.g., CSS, images)
    ]
};
