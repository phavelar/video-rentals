let customer = {
    "name": "martin",
    "rentals": [
        {"movieID": "F001", "days": 3},
        {"movieID": "F002", "days": 1},
    ]
};

let movies = {
    "F001": {"title": "Ran", "code": "regular"},
    "F002": {"title": "Trois Couleurs: Bleu", "code": "regular"},
    // etc
};


function statement(customer, movies) {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;
    for (let r of customer.rentals) {
        let movie = movies[r.movieID];
        let thisAmount = 0;

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (r.days > 2) {
                    thisAmount += (r.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = r.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (r.days > 3) {
                    thisAmount += (r.days - 3) * 1.5;
                }
                break;
        }

        //add frequent renter points
        frequentRenterPoints++;
        // add bonus for a two day new release rental
        if(movie.code === "new" && r.days > 2) frequentRenterPoints++;

        //print figures for this rental
        result += `\t${movie.title}\t${thisAmount}\n` ;
        totalAmount += thisAmount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points\n`;

    return result;
}
console.log(statement(customer, movies));

//
// Reason for change is that we now need to print statement in HTML as such:
//
// <h1>Rental Record for <em>martin</em></h1>
// <table>
// <tr><td>Ran</td><td>3.5</td></tr>
// <tr><td>Trois Couleurs: Bleu</td><td>2</td></tr>
// </table>
// <p>Amount owed is <em>5.5</em></p>
// <p>You earned <em>2</em> frequent renter points</p>
//
// Since there is new requirement and the existing code is complex to deal with
// we are going to refactor it. However, for this example, we don't have unit tests...