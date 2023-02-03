<template>
	<div>
		<div>
			<button @click="home">Home</button>
		</div>
		<table id="jobs" style="margin-top: 70px">
			<tr>
				<th>No.</th>
				<th>Job Id</th>
				<th>Name</th>
				<th>status</th>
			</tr>
			<tr v-for="(s, index) in sjobs" :key="index">
				<td>{{ index + 1 }}</td>
				<td>{{ s.j_id }}</td>
				<td>{{ s.jobname }}</td>
				<td>{{ s.status }}</td>
			</tr>
		</table>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			sjobs: [],
		};
	},
	methods: {
		home: function () {
			this.$router.push("/seeker");
		},
	},

	created() {
		if (!localStorage.getItem("isSlogin")) {
			this.$router.push("/");
		} else {
			const id = localStorage.getItem("s_id");

			axios
				.get(`http://localhost:4030/users/sJobs/${id}`)
				.then((response) => {
					console.log(response.data.data);
					this.sjobs.length = 0;
					this.sjobs = this.sjobs.concat(response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
};
</script>
<style scoped>
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
