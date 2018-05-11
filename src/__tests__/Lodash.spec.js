import assert from 'assert'
import groupBy from 'lodash/groupBy'
import lowerFirst from 'lodash/lowerFirst'

describe('Lodash Test', () => {
  it('groupBy', () => {
    const list = [{ data: 1 }, { data: 2 }];
    const gb = groupBy(list, 'data');
    console.log(gb);
    assert.ok(list.length === 2);
  });

  it('lowerFirst', () => {
    ['Department', 'User'].forEach(
      item => console.log(lowerFirst(item))
    );
  });
});

