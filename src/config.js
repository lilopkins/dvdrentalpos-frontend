const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const config = {
    'API_BASE': dev ? 'http://localhost:8888/api/v1' : 'https://dvdrentalpos-1655464304001.azurewebsites.net/api/v1',
    'DEVELOPMENT': dev,
};

export default config;
