import { assert } from 'chai';
import { it } from 'mocha';

import { RabinKarp } from '../src/rabin-karp.js';

it('Construct', function () {
  assert.equal(RabinKarp('abracadabra').text, 'abracadabra');
  assert.equal(RabinKarp('abracadabra').length, 11);
});

it('find', function () {
  assert.deepEqual(RabinKarp('abracadabra').find('bra'), [1, 8]);
});
