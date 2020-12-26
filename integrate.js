//request handler will spawn process and execute python script. So, rewrite the python file to take arguments and return the results.
//i dont know what else to do in integration.

//app.post("/authenticate", (req, res)=>{ auth(req.body.image) } )

const spawn = require("child_process").spawn;

function auth(image) {
	const pythonProcess = spawn("python3", ["test.py", image]);
	pythonProcess.stdout.on("data", (data) => {
		console.log(data.toString());
		//if authenticated then redirect
	});
}

auth("adf23");
