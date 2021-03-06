window.addEventListener('load', function() {
	calcBudget(null, null, function(budget) {
		$('#current-balance').text('£' + budget);

		getTransactions({}, function(transactions) {
			let list = $('#recordList');
			drawChart(calcTotals(budget, transactions), 'Monthly Spendings', $('#expenses-chart').get()[0])
			transactions = transactions.reverse().slice(0, 5).reverse();
			transactions.forEach(function(transaction) {
				list.prepend(newRecEl(transaction));
			})
		})
	})
})
