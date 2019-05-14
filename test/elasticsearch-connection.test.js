import { expect } from 'chai';

import checkConnection from '../server/connection';

describe('my test', () => {
    context('elasticsearch', () => {
        it('should connect to the elasticsearch container', async () => {
            const results = await checkConnection();
            expect(results.status).to.equal('green');
            expect(results.number_of_nodes).to.equal(1);
            expect(results.number_of_data_nodes).to.equal(1);
        });
    });
});