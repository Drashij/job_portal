<template>
	<div>
		<header>
			<button @click="logout" style="margin-right: 10px">logout</button>
			<button @click="gotostatus" style="margin-right: 10px">your jobs</button>
			<button @click="">My Profile</button>
		</header>
		<h1 style="margin-left: 30rem">Welcome {{ name }}</h1>
		<h2 style="margin-left: 30rem">Search Jobs here....</h2>
		<input
			type="text"
			v-model="search"
			placeholder="Search jobs"
			style="margin-left: 30rem"
		/>
		<p v-if="isalready" style="margin-left: 35rem">{{ msg }}</p>
		<table id="jobs" style="margin-top: 280px">
			<tr>
				<th>No.</th>
				<th>Job name</th>
				<th>Category</th>
				<th>Required skills</th>
				<th>Experience needed</th>
				<th>Salary</th>

				<th>Apply</th>
			</tr>
			<tr v-for="(j, index) in filteredJobs" :key="index">
				<td>{{ index + 1 }}</td>
				<td>{{ j.name }}</td>
				<td>{{ j.category }}</td>
				<td>{{ j.skills }}</td>
				<td>{{ j.experience }} years</td>
				<td>{{ j.salary }}</td>
				<td>
					<button @click="applyJob(j.j_id, j.g_id, index, j.name)">
						Apply
					</button>
				</td>
			</tr>
		</table>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			name: "",
			jobs: [],
			search: "",
			msg: "already applied",
			isalready: false,
		};
	},
	methods: {
		logout: function () {
			localStorage.clear();
			this.$router.push("/");
			this.$session.destroy();
		},
		gotostatus: function () {
			this.$router.push("/status");
		},
		applyJob: function (j, g, n, jname) {
			const sis = localStorage.getItem("s_id");
			axios
				.post("http://localhost:4030/users/applyjob", {
					j_id: j,
					s_id: sis,
					g_id: g,
					status: "not known",
					jobname: jname,
					seekername: this.name,
				})
				.then((response) => {
					console.log(response.data);
					if (response.data == "already applied") {
						this.isalready = true;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	computed: {
		filteredJobs: function () {
			return this.jobs.filter((job) => {
				return job.name.match(this.search);
			});
		},
	},
	created() {
		if (!localStorage.getItem("isSlogin")) {
			this.$router.push("/");
		} else {
			const id = localStorage.getItem("id");
			axios
				.get(`http://localhost:4030/users/seeker/${id}`)
				.then((response) => {
					console.log(response.data);
					this.name = response.data[0].name;
					console.log(response.data[0].s_id);

					localStorage.setItem("s_id", response.data[0].s_id);
					localStorage.setItem("s_name", response.data[0].name);
				})
				.catch((error) => {
					console.log(error);
				});

			//getting every job
			axios
				.get(`http://localhost:4030/users/all`)
				.then((response) => {
					console.log("alljobs below");
					console.log(response.data);
					this.jobs.length = 0;
					this.jobs = this.jobs.concat(response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
};
</script>
<style scoped>
input {
	border-radius: 5px;
	height: 40px;
	line-height: normal;
	color: #282828;

	box-sizing: border-box;

	font-size: 16px;
	padding: 0 6px;
	margin-right: 20px;
	margin-top: 7px;
}
button {
	background-color: #04aa6d;
	padding: 8px 16px;
	border-radius: 3px;
	margin-top: 10px;
	margin-bottom: 7px;
	transition: 300ms;
}
button:hover {
	background-color: #ebf3f7;
}
</style>
