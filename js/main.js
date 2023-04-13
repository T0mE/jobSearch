fetch('https://boards-api.greenhouse.io/v1/boards/a/jobs')
	.then((data) => {
		return data.json();
	})
	.then((post) => {
		appendData(post);
		// console.log(post);
	});
function appendData(data) {
	const boxWrapper = document.getElementById('box-wrapper');

	for (let i = 0; i < data.jobs.length; i++) {
		const box = document.createElement('div');
		const img = document.createElement('div');
		const position = document.createElement('div');

		const company = document.createElement('p');
		const tx = document.createElement('p');
		const time = document.createElement('p');

		box.classList.add('result_proposal-el');
		img.classList.add('result_proposal-img');
		position.classList.add('result_proposal-position');

		company.classList.add('result_proposal-company');
		tx.classList.add('result_proposal-tx');
		time.classList.add('result_proposal-time');

		company.innerHTML = 'Company';
		console.log(data.jobs[i].title);
		tx.innerHTML = data.jobs[i].title;
		time.innerHTML = 'Full Time';

		boxWrapper.appendChild(box);
		box.appendChild(img);
		box.appendChild(position);
		position.appendChild(company);
		position.appendChild(tx);
		position.appendChild(time);
	}
}
