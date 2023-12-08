/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let categoryTotalSpent = {};
  for (let  i =0;i<transactions.length;i++){
    console.log(transactions);
      if(!categoryTotalSpent.hasOwnProperty(transactions[i].category)){
        categoryTotalSpent[transactions[i].category] = transactions[i].price;
      }else{
        categoryTotalSpent[transactions[i].category] += transactions[i].price;
      }
  }
  let finalSpendings = []
  for(let key in categoryTotalSpent){
    let spending = {
      category : key,
      totalSpent : categoryTotalSpent[key]
    }
    finalSpendings.push(spending);
  }
  return finalSpendings;
}



let transactions = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  },
  {
    id: 2,
    timestamp: 1656076800000,
    price: 10,
    category: 'fruits',
    itemName: 'Pizza',
  },
  {
    id: 3,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }

]
console.log(calculateTotalSpentByCategory(transactions));
module.exports = calculateTotalSpentByCategory;
