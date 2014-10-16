import Ember from 'ember';

export default Ember.ArrayController.extend({
  // goodCards: Ember.computed.filterBy("content","rating","good"),
  // badCards: Ember.computed.filterBy("content","rating","bad"),
  // unrankedCards: Ember.computed.filterBy("content","rating","unranked"),

  goodCards: [],
  badCards: [],
  unrankedCards: [],

  indit: function() {
    var me = this;
    // var ratings = Ember.A(["good","bad","unranked"]);

    // ratings.forEach(function(rating) {
    //   me.set(rating+"Cards",[]);
    // });


    this.forEach(function(card) {
      var rating = card.get('rating');
      var list = me.get(rating+"Cards");
      // if (!list) {
      //   this.set(rating+"Cards",[]);
      // }
      list.pushObject(card);
    });
  },

  setupRatings: function() {
    var me = this;
    this.forEach(function(card) {
      var rating = card.get('rating');
      var list = me.get(rating+"Cards");
      list.pushObject(card);
    });
    this.set("readyToWatch",true);
  }.observes("content"),

  eachCardWithRating: function(f) {
    var ratings = ["good","bad","unranked"];

    var yieldCards = function(cards,rating) {
      cards.forEach(function(card) {
        f(card,rating);
      });
    };

    for(var i=0;i<ratings.length;i++) {
      var rating = ratings[i];
      var cards = this.get(rating+"Cards");
      yieldCards(cards,rating);
    }
  },

  saveRatings: function() {
    if (this.get('readyToWatch')) {
      this.eachCardWithRating(function(card,rating) {
        card.set("rating",rating);
        card.save();
      });
    }
  }.observes("goodCards.@each","badCards.@each","unrankedCards.@each"),

  actions: {
    save: function() {
      this.eachCardWithRating(function(card,rating) {
        card.set("rating",rating);
        card.save();
      });

      // this.forEach(function(card) {
      //   card.save();
      // });
    }
  }
});
