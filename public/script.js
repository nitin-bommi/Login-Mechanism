var id = 0;
function onSubmit(event) {
	event.preventDefault();
	console.log("Submitted");
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const data = { firstName, lastName, email, password };
	fetch('/basic_registration', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		// redirect: "follow",
		body: JSON.stringify(data)
	})
		.then((response) => {

			if (response.redirected) {
				localStorage.setItem('url', response.url);
				window.location.href = response.url;
			}
		})
		.catch(function (error) {
			console.log(error);
		})


}
const onButton = (event) => {

	event.preventDefault();
	const gender = document.getElementById("gender").value;
	const url = localStorage.getItem('url');
	const id = Number(url.substr(url.indexOf("=") + 1));
	const data = { id, gender };
	fetch('/info_registration', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: "follow",
		body: JSON.stringify(data)
	})
		.then((response) => {
			return response.text();
		}).then(data => {
			console.log(data);
		})
		.catch(function (error) {
			console.log(error);
		})

}
