const AddMongoDate = require('../helpers/add-mongo-date');
const Find = require('../db-methods/find');

// grabs the news and spotlight items for the home page
const HomeLoad = () => (
  new Promise((resolve) => {
    // get the top three news stories sorted by date
    // get top five articles sorted by date
    Promise.all([
      Find('news', {}, {}, { _id: -1 }, 3),
      Find('spotlight', {}, {}, { _id: -1 }, 5),
    ])
      .then((documents) => {
        resolve({
          data: {
            news: AddMongoDate.arr(documents[0]),
            spotlight: AddMongoDate.arr(documents[1]),
          },
          status: 200,
        });
      })
      .catch(() => {
        resolve({
          data: {
            news: null,
            spotlight: null,
          },
          status: 200,
        });
      });
  })
);
module.exports = HomeLoad;
