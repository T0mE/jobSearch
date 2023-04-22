document.addEventListener('DOMContentLoaded', function () {
	const loader = document.querySelector('.loader');
	const fullTime = document.getElementById('time');
	const inputSearchJob = document.querySelector('.search__input');
	const btnSearchJob = document.getElementById('btnSearch');
	const location = document.querySelector('.result__radio-locInput');

	let job = [];

	fetch('https://boards-api.greenhouse.io/v1/boards/a/jobs')
		.then((data) => {
			return data.json();
		})
		.then((post) => {
			loader.classList.add('hide-loader');
			job = [...post.jobs];
			appendData(job);
		});

	function appendData(data) {
		const boxWrapper = document.getElementById('box-wrapper');
		console.log(data);
		for (let i = 0; i < data.length; i++) {
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
			tx.innerHTML = data[i].title;
			time.innerHTML = data[i].data_compliance[0].requires_consent
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
		console.log(this.checked);
		let jobs = [];

		const result = document.querySelector('.result_proposal');
		result.innerHTML = '';

		if (this.checked) {
			for (let step = 0; step < jobs.length; step++) {
				if (jobs[step].data_compliance[0].requires_consent) {
					fullTime.push(jobs[step]);
				}
			}
		} else {
			appendData(job);
		}
	});

	btnSearchJob.addEventListener('click', function () {
		const searchVal = inputSearchJob.value;
		let searchJob = [];
		for (let step = 0; step < job.length; step++) {
			if (job[step].title.includes(searchVal)) {
				searchJob.push(job[step]);
			}
		}
		console.log(searchJob);
		const result = document.querySelector('.result_proposal');
		result.innerHTML = '';
		appendData(searchJob);
	});

	location.addEventListener('input', () => {
		let loc = [];
		for (let i = 0; i < job.length; i++) {
			if (job[i].location.name.includes(location.value)) {
				loc.push(job[i]);
			}
			const result = document.querySelector('.result_proposal');
			result.innerHTML = '';
			appendData(loc);
		}
	});
});
