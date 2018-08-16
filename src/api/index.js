import { Router } from 'express';
import facets from './facets';
import fanfics from './fanfics';
import fanficFiletrs from './fanfics/filters';

export default ({ config, db }) => {
	let api = Router({ mergeParams: true });

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

  // mount the fanfics resource
  api.use('/fanfics', fanfics({ config, db }));
  api.use('/fanfics/filter', fanficFiletrs({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: 'src' });
	});

	return api;
}
