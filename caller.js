// var $ = require('./jquery.min.js');


var nytimeGetter = {
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    params: function(){
        return "?" + $.param({ 
            'api-key': 
            "82989fcec701434486d155f547f26b96" });
    },
    getQuery: function(){
        var example = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=82989fcec701434486d155f547f26b96&q=trump&begin_date=20170101&end_date=20170201&page=0";
        // gets values from frontend for feeding into url

        var recordCount = $("#recordsToReceive").val();

        var searchParams = $.param({
                q: $("#query").val(),
                begin_date: $("#startYear").val() + "0101",
                end_date: $("#endYear").val() + "0101", 
            });
            return searchParams;
    },
    callAjax: function(){
        // console.log(nytimeGetter.url);

        var fullUrl = nytimeGetter.url 
                        + nytimeGetter.params() 
                        + "&" + nytimeGetter.getQuery();

        console.log(fullUrl);

        $.ajax({
            url: fullUrl,
            method: "GET"
        }).done(function(result){
            // console.log(result.response.docs);
            var articles = result.response.docs;
            var elements = "";
            for (const article in articles) {
                if (articles.hasOwnProperty(article)) {
                    const element = articles[article]; 
                    console.log(" an element " + element.headline.main);
                    elements += "<h1>" + element.headline.main + "</h1>";
                }
            }
            $("#topArticles").append(elements);


            return result.response.docs;
        }).fail(function(err){
            // do stuff with err
            return err;
        })

    },
    outputAjax: function(){

        var articles = nytimeGetter.callAjax();
        var elements = "";

        console.log(articles);
        
        // for (const article in articles) {
        //     if (articles.hasOwnProperty(article)) {
        //         const element = articles[article]; 
        //         console.log(" an element " + element);
        //         elements += element;
        //     }
        // }
        // $("#topArticles").append(elements);
    }
}
$("#getNyTimes").on("click", function(){
    nytimeGetter.outputAjax();
})
