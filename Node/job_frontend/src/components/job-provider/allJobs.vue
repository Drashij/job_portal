<template>
	<div>
		<div>
			<button @click="home" style="padding: 10px 20px">Home</button>
			<button @click="logout" style="margin-left: 30px; padding: 10px 20px">
				logout
			</button>
		</div>

		<div>
			<table id="jobs" style="margin-top: 55px">
				<tr>
					<th>Category</th>
					<th>Job Name</th>
					<th>Skills</th>
					<th>Experience(in years)</th>
					<th>Salary</th>
					<th>Location</th>

					<th>Delete</th>
					<th>See</th>
				</tr>
				<tr v-for="(a, index) in arr" :key="index">
					<td>{{ a.category }}</td>
					<td>{{ a.name }}</td>
					<td>{{ a.skills }}</td>
					<td>{{ a.experience }}</td>
					<td>{{ a.salary }}</td>
					<td>{{ a.location }}</td>
					<td><button @click="dltjob(a.j_id, index)">Delete</button></td>
					<td><button @click="gotoJob(a.j_id)">See</button></td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
import axios from "axios";

export default {
	data() {
		return {
			arr: [],
		};
	},
	methods: {
		home: function () {
			this.$router.push("/provider");
		},
		logout: function () {
			localStorage.clear();
			this.$session.destroy();
			this.$router.push("/");
		},
		gotoJob: function (a) {
			localStorage.setItem("j_id", a);
			this.$router.push("/job");
		},
		dltjob: function (vt, i) {
			axios
				.delete(`http://localhost:4030/deleteJob/${vt}`)
				.then((response) => {
					console.log(response);
					this.arr.splice(i, 1);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		if (!localStorage.getItem("isPlogin")) {
			this.$router.push("/");
		} else {
			const id = localStorage.getItem("g_id");
			axios
				.get(`http://localhost:4030/users/pjobs/${id}`)
				.then((response) => {
					console.log(response.data);
					this.arr.length = 0;
					this.arr = this.arr.concat(response.data.data);

					console.log(this.arr);
				})
				.catch((error) => {
					this.ierr = true;

					console.log(error);
				});
		}
	},
};
</script>
<style scoped>
button {
	background-color: #04aa6d;

	border-radius: 3px;

	color: aliceblue;
	border-color: white;
}
button:hover {
	background-color: #5fc32c;
}
</style>
