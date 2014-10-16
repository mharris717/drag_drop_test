import DS from 'ember-data';
import cardJson from './card-json';

var Card = DS.Model.extend({
  name: DS.attr("string"),
  rating: DS.attr('string'),
  rev: DS.attr('string'),

  shortName: function() {
    var dashes = /[ :']+/g;
    //var remove = """[^a-z0-9\-]+"""
    var res = this.get('name').replace(dashes,"-");
    return res.toLowerCase();
  }.property("name"),

  imageUrl: function() {
    var n = this.get('shortName');
    //return "https://s3-us-west-2.amazonaws.com/hearthstats/cards/"+n+".png";
    return "http://localhost:4500/card_images/"+n+".png";
  }.property("shortName")
});

var makeFixtures = function() {
  var res = [];
  var cardData = cardJson.data;

  for (var i=0;i<2;i++) {
    var data = cardData[i];
    if (i === 0) {
      data.rating = "good";
    }
    else {
      data.rating = "unranked";
    }
    res.push(data);
  }
  return res;
};

Card.reopenClass({
  FIXTURES: makeFixtures()
});

export default Card;

// val dashes = "[ :']+"
// val remove = """[^a-z0-9\-]+"""
// val fileName: String =
//   originalName.toLowerCase.replaceAll(dashes, "-").replaceAll(remove, "") + ".png"