# Modern NodeJs Express Webapp

## Before running the application
1. Run `npm install` to install the dependencies

1. Rename `.env.example` to `.env` and provide suitable values
 
## For testing
```
npm test
```

If you get _timeout exceeded error_ then try increasing the timeout
```javascript
it('should have an index route', async function () {
  this.timeout(5000); // Increase this value if get timeout exceeded error. Mocha default is 2000 ms
  const res = await chai.request(app).get('/');
  res.should.have.status(200);
});
```

## For running the application
### Development Mode
```
npm run start:dev
```

### Normal Mode
```
npm start
```