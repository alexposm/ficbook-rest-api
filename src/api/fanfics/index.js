import resource from 'resource-router-middleware';
import Fanfic from '../../models/fanfics';

export default ({ config, db }) => resource({
  /** Property name to store preloaded entity on `request`. */
  id : 'fanfic',

  /** GET / - List all entities */
  index({ query }, res) {
    Fanfic.apiQuery(query || {})
      .select('ficbookId email')
      .then(fanfics => {
        res.json(fanfics);
      })
      .catch(err => {
        console.log(err);
        res.status(422).send(err.errors);
      });
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    if (body && body.id && Number(body.id) && body.email) {

      Fanfic.findOne({ ficbookId: Number(body.id) })
        .then(fanfic => {
          if (fanfic) {
            Fanfic.remove({ ficbookId: Number(body.id) }, function(err) {
              if (!err) {
                res.json({ ficbookId: null });
              }
              else {
                res.status(422).send({});
              }
            });
          } else {
            Fanfic.create({ ficbookId: Number(body.id), email: body.email })
              .then(fanfic => {
                res.json(fanfic);
              })
              .catch(err => {
                res.status(500).send(err);
              });
          }
        });
    } else {
      res.status(422).send({});
    }
  },

  /** DELETE /:id - Delete a given entity */
  delete({ params }, res) {
    if (params && params.fanfic && Number(params.fanfic)) {
      Fanfic.remove({ ficbookId: Number(params.fanfic) }, function(err) {
        if (!err) {
          res.json({ id: 6 });
        }
        else {
          res.status(422).send({});
        }
      });


      console.log('Number(params.fanfic)', Number(params.fanfic))
    } else {
      res.status(422).send({});
    }
  }

});