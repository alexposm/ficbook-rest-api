import resource from 'resource-router-middleware';
import Fanfic from '../../models/fanfics';

export default ({ config, db }) => resource({
  /** Property name to store preloaded entity on `request`. */
  id : 'filters',

  /** POST / - Create a new entity */
  create({ body }, res) {
    const queryArr = [];

    if (body && body.ids && body.ids.length && body.email) {
      body.ids.forEach((id) => {
        queryArr.push({ ficbookId: Number(id) });
      });

      Fanfic.find({ "email": body.email, $or: queryArr}, function(err, data) {
        if (err) {
          res.status(500).send(err);
        }
        const filtered = [];
        if (data && data.length) {
          data.forEach((item) => {
            filtered.push(item.ficbookId);
          });
        }
        res.json({ filteredIds: filtered });
      });
    } else {
      res.status(422).send({});
    }
  },

});