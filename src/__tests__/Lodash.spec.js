import assert from 'assert'
import groupBy from 'lodash/groupBy'

describe('Lodash Test', () => {
  it('groupBy', () => {
    const list = [{ data: 1 }, { data: 2 }];
    const gb = groupBy(list, 'data');
    console.log(gb);
    assert.ok(list.length === 2);
  });
});

