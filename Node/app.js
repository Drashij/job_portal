const express = require("express");
const bodyParser = require("body-parser");
const client = require("./service.js");

const cors = require("cors");

const app = express();

const port = "4030";
app.use(bodyParser.json());

app.options("*", cors());

app.use((req, res, next) => {
	try {
		res.setHeader("Access-Control-Allow-Origin", "*");

		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	} catch (error) {
		return res.status(401).json({ message: "failed" });
	}
});

app.post("/users/register", client.createUser);
app.post("/users/login", client.getlogin);
app.post("/users/provider/profile", client.pProfile);
app.post("/users/seeker/profile", client.sProfile);
app.get("/users/provider/:id", client.getProviderById);
app.get("/users/seeker/:id", client.getSeekerById);
app.get("/users/seekerS/:id", client.getSeekerBySId);
app.post("/users/job/:id", client.postJob);
app.get("/users/pjobs/:id", client.getPjobs);

app.get("/users/all", client.all);
app.post("/users/applyjob", client.applyjob);
app.get("/users/sJobs/:id", client.sJobs);
app.get("/users/people/:id", client.getJobPeople);
app.post("/users/status/:id", client.setStatus);

app.delete("/deleteJob/:id", client.deleteJob);
app.listen(port, () => {
	console.log(`server listening at port : ${port}`);
});
