<template>
	<div>
		<header>
			<div>
				<button @click="home" style="padding: 10px 20px">Home</button>
				<button @click="logout" style="margin-left: 30px; padding: 10px 20px">
					logout
				</button>
			</div>
		</header>

		<table id="jobs" style="margin-top: 55px">
			<tr>
				<th>Job name</th>
				<th>Person name</th>
				<th>See profile</th>
				<th>Status</th>
				<th>Accept/Reject</th>
			</tr>
			<tr v-for="(p, index) in people" :key="index">
				<td>{{ p.jobname }}</td>
				<td>{{ p.seekername }}</td>
				<td>
					<button @click="getSeeker(p.s_id)">See</button>
					<div v-if="issee" v-for="s in seeker">
						<button v-if="issee" @click="issee = false">close</button>
						<p>Name : {{ s.name }}</p>
						<p>skills : {{ s.skills }}</p>
						<p>experience : {{ s.experience }}</p>
						<p>address : {{ s.address }}</p>
						<p>contact : {{ s.contact }}</p>
					</div>
				</td>
				<td>{{ p.status }}</td>
				<td>
					<button @click="status(acc, p.s_id, p.j_id, index)">✅</button>
					<button @click="status(rej, p.s_id, p.j_id, index)">❌</button>
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
			issee: false,
			acc: "accepted",
			rej: "rejected",
			seeker: [],
			people: [],
		};
	},
	methods: {
		home: function () {
			this.$router.push("/alljobs");
			localStorage.setItem("j_id", "");
		},
		logout: function () {
			localStorage.clear();
			this.$router.push("/");

			this.$session.destroy();
		},
		getSeeker: function (i) {
			this.issee = true;
			axios
				.get(`http://localhost:4030/users/seekerS/${i}`)
				.then((response) => {
					console.log(response.data);
					this.seeker.length = 0;
					this.seeker = this.seeker.concat(response.data);

					console.log(this.seeker);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		status: function (sta, sid, jid, indx) {
			axios
				.post(`http://localhost:4030/users/status/${sid}`, {
					status: sta,
					j_id: jid,
				})
				.then((response) => {
					console.log(response.data);
					this.people[indx].status = sta;
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
			const id = localStorage.getItem("j_id");
			axios
				.get(`http://localhost:4030/users/people/${id}`)
				.then((response) => {
					console.log(response.data);
					this.people.length = 0;
					this.people = this.people.concat(response.data.data);

					console.log(this.people);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
};
</script>
