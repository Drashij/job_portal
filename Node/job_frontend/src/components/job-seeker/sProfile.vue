<template>
	<div>
		<p v-if="ischeck">Please fill all the details</p>
		<h1>Please complete Your Profile</h1>
		<div>
			<input
				type="name"
				v-model="name"
				id="name"
				name="name"
				placeholder="Name"
				required
			/>
		</div>

		<div>
			<input
				type="text"
				v-model="address"
				id="address"
				name="address"
				placeholder="address"
				required
			/>
		</div>
		<div>
			<input
				type="text"
				v-model="skills"
				id="skills"
				name="skills"
				placeholder="Skills"
				required
			/>
		</div>
		<div>
			<input
				type="integer"
				v-model="experience"
				id="experience"
				name="experience"
				placeholder="Experience in years"
				required
			/>
		</div>
		<div>
			<input
				type="integer"
				v-model="contact"
				id="contact"
				name="contact"
				placeholder="contact no."
				required
			/>
		</div>
		<div><button @click="addSeekerProfile">Submit</button></div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			ischeck: false,
			name: "",
			address: "",
			skills: "",
			experience: "",
			contact: "",
		};
	},
	methods: {
		addSeekerProfile: function () {
			if (
				this.name == "" ||
				this.address == "" ||
				this.skills == "" ||
				this.experience == "" ||
				this.contact == ""
			) {
				this.ischeck = true;
			} else {
				console.log("sending ");
				axios
					.post("http://localhost:4030/users/seeker/profile", {
						u_id: localStorage.getItem("u_id"),
						name: this.name,
						address: this.address,
						skills: this.skills,
						experience: this.experience,
						contact: this.experience,
					})
					.then((response) => {
						console.log(response.data);

						this.$router.push("login");
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
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
</style>
