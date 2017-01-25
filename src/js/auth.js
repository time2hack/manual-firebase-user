var Firebase = require('firebase');

module.exports = {
  auth: null,
  init: function (callback) {
    var config = {
      apiKey: "AIzaSyCDSX7JJqLZ1RMoFqLifpDd9PbfiKbty5E",
      authDomain: "manual-registration.firebaseapp.com",
      databaseURL: "https://manual-registration.firebaseio.com",
      storageBucket: "manual-registration.appspot.com",
      messagingSenderId: "74503535624"
    };
    Firebase.initializeApp(config);

    this.auth = Firebase.auth();
    this.auth
      .onAuthStateChanged(function(user) {
        if(callback){
          callback();
        }
      })

    return this;
  },

  checkLoggedInUser: function(){
    return this.auth.currentUser
  },

  logout: function () {
    this.auth
      .signOut()
      .then(function () {
        return true;
      })
      .catch(function (e) {
        return false;
      })
  },
  login: function (type, data) {
    var auth = Firebase.auth();
    var request = null;
    switch(type){
      case 'email': {
        request = auth.signInWithEmailAndPassword(data.email, data.password)
        break;
      }
    }
    if( request !== null ){
      return request
        .then(this.resultHandler)
        .catch(this.errorHandler);
    } else {
      console.log('No Method Found');
      return null;
    }
  },

  resultHandler: function (user) {
    console.log(user)
    return user;
  },

  errorHandler: function (err) {
    console.error(err);
    return false;
  }
}
