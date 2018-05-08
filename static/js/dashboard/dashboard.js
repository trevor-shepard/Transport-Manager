new Vue({
    el: '#dashboard',
    delimiters: ["[[", "]]"],
    data: {
        todayTrips : [],
        futureTrips : [],
        days: 7,
        floor: 0,
        loading: false,
    },
    methods: {
        getTodayTrips: function(){
            this.loading=true;
            var self = this
            $.get('/schedule/trip/today')
            .done(function(todayTrips){
                self.todayTrips = todayTrips
                self.loading = false;
            })    
        },
        getFutureTrips: function(){
            this.loading=true;
            var self = this
            $.get('/schedule/trip/future' + '?days=' + self.days + '&floor=' + self.floor)
            .done(function(futureTrips){
                self.futureTrips = futureTrips
                self.loading = false;
            })    
        },

        checkSubmitDays: function(event){
            if (event.code === 'Enter'){
                this.getFutureTrips()
            }
        }
    },
    created: function(){
        this.getTodayTrips()
        this.getFutureTrips()
    }
})
