// @TODO: YOUR CODE HERE!
d3.csv("./data.csv", function(Data,error) {
    if (error) return console.log (error); 
    console.log(Data);
});
