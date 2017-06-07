'use strict';

(function(){

class TheatreComponent {
  constructor($http, $scope, socket) {




    this.message = 'Hello';
    this.socket = socket;
    this.$http = $http;
    this.theatre = [];
    this.Cdata=[];
    this.movie = [];
    this.time=[];
    this.box=[];
    this.dates=[];
        $scope.$on('$destroy', function(){
          socket.unsyncUpdates('theareend');
        });

 $(document).ready(function() {

   $('#undo_redo').multiselect();


 });

  }


AddTheatre(){
  this.$http.post('/api/theareends/' + this.TheatreName + '/' + this.PlaceName + '/' + this.City,{
   TheatreName: this.TheatreName,
   PlaceName  : this.PlaceName,
   City       : this.City

     });

    {
      this.TheatreName = '';
      this.PlaceName   = '';
      this.City        = '';
    }
}


addTime(){
 this.time.push({
time:this.hr + "-" + this.min + "-" + this.type});}

 addDate(){
  this.dates.push({
  date:this.date
   });
}
 removeDate(d){
   var remove= this.dates.indexOf(d);
  this.dates.splice(remove,1);
}

removeTime(y){
  var remove= this.time.indexOf(y);
 this.time.splice(remove,1);

}

$onInit(){

  this.$http.get('/api/theareends').then(response=>{
    this.Cdata = response.data;
    this.socket.syncUpdates('theareend',this.Cdata);

  });

  this.$http.get('/api/moviesendpoints').then(response=>{
    this.movie=response.data;
  this.socket.syncUpdates('theareend', this.movie);
  });

  }

 delete(t){
   this.$http.delete('/api/theareends/' + t._id);
 }


 mapping()
{
 this.$http.post('/api/mapendpoints',{
  MovieName:this.movie,
  location:this.city,
  theatreName:this.search,
  time:this.time,
  date:this.dates

 });

 this.$http.put('/api/moviesendpoints/' + this.movie ,{

  Status : true
 });

 }

}

angular.module('yeomanApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    controllerAs: 'theatreCtrl'
  });

})();
