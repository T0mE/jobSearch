document.addEventListener('DOMContentLoaded', function () {
	const loader = document.querySelector('.loader');
	const fullTime = document.getElementById('time');
	const inputSearchJob = document.querySelector('.search__input');
	const btnSearchJob = document.getElementById('btnSearch');

	let jobs = [];

	fetch('https://boards-api.greenhouse.io/v1/boards/a/jobs')
		.then((data) => {
			return data.json();
		})
		.then((post) => {
			loader.classList.add('hide-loader');
			jobs = post;
			console.log(jobs);
			appendData(jobs);
		});

	function appendData(data) {
		const boxWrapper = document.getElementById('box-wrapper');
		console.log(data);
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
			tx.innerHTML = data.jobs[i].title;
			time.innerHTML = data.jobs[i].data_compliance[0].requires_consent
				? 'Full time'
				: 'Part time';

			boxWrapper.appendChild(box);
			box.appendChild(img);
			box.appendChild(position);
			position.appendChild(company);
			position.appendChild(tx);
			position.appendChild(time);
		}
	}

	fullTime.addEventListener('change', function () {
		let fullTime = {};
		let partTime = {};
		console.log(jobs.length);
		for (let step = 0; step < jobs.length; step++) {
			console.log(jobs.jobs[step].data_compliance[0].requires_consent);
			jobs.jobs[step].data_compliance[0].requires_consent
				? fullTime.add(jobs)
				: partTime.add(jobs);
		}

		console.log('Full time: ' + fullTime.length);
		console.log('Part time: ' + partTime.length);
		const result = document.querySelector('.result_proposal');
		result.innerHTML = '';
		if (this.checked) {
			console.log('checked');
		} else {
			appendData(partTime);
			console.log('not checked');
		}
	});

	btnSearchJob.addEventListener('click', function () {
		const searchVal = inputSearchJob.value;
		let searchJob = [];
		for (let step = 0; step < jobs.jobs.length; step++) {
			if (jobs.jobs[step].title.includes(searchVal)) {
				searchJob.push(jobs.jobs[step]);
			}
		}
		console.log(searchJob);
		const result = document.querySelector('.result_proposal');
		result.innerHTML = '';
		appendData(searchJob);
	});
});
