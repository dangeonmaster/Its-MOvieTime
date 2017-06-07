'use strict';

(function(){

class MoviesComponent {
  constructor($scope, $http, socket) {
    this.message = 'Hello';
    this.socket = socket;
    this.$http = $http;
    this.useData = [];
    this.getDataDb = [];


      $scope.$on('$destroy', function() {
         socket.unsyncUpdates('moviesendpoint');
         });

  }
  searchMovie(){
    if(this.movieName !== undefined){
    this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=be5622a51c43706db4785958dc92de92&query=' + this.movieName).then( response=>{

      this.useData = response.data;
    });
}
}

   AddMovie(){this.$http.post('/api/moviesendpoints',{
      Title:this.useData.Title,
      Langauge:this.useData.Language,
      Poster:this.useData.Poster,
      Year:this.useData.Year,
      Director:this.useData.Director,
      Runtime:this.useData.Runtime,
      Genre:this.useData.Genre,
      Actors:this.useData.Actors

    });

}

$onInit(){

   this.$http.get('/api/moviesendpoints').then(response=>{
     this.getDataDb=response.data;
   this.socket.syncUpdates('moviesendpoint', this.getDataDb);
   });

 }

delete(x){
   this.$http.delete('/api/moviesendpoints/' + x._id);
}

}

angular.module('yeomanApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesendCtrl'
  });

})();
