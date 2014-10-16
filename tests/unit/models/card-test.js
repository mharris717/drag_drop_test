import {
  moduleForModel,
  test
} from 'ember-qunit';
import Card from '../../../models/card';

moduleForModel('card', 'Card', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test("smoke", function() {
  var card = Card.FIXTURES[0];
  equal(card.name,"Edwin VanCleef"); 
});