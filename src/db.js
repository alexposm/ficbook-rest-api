import mongoose from 'mongoose';
import config from './config.json';

mongoose.Promise = global.Promise;

const url = `mongodb://${config.mongodb.dbuser}:${config.mongodb.dbpassword}@ds219672.mlab.com:19672/${config.mongodb.database}`;

// export default connection;
export default callback => {
	// connect to a database if needed, then pass it to `callback`:

  const connection = mongoose.connect(url, { useNewUrlParser: true });

  connection
    .then(db => {
      console.log(
        `Successfully connected to ${config.mongodb.database} MongoDB cluster mode.`,
      );
      callback(db);
    })
    .catch(err => {
      if (err.message.code === 'ETIMEDOUT') {
        console.log('Attempting to re-establish database connection.');
        mongoose.connect(config.mongodb.database);
      } else {
        console.log('Error while attempting to connect to database:');
        console.log(err);
      }
    });
}
