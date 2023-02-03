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
				v-model="comp_no"
				id="comp_no"
				name="comp_no"
				placeholder="Company Reg. Number"
				required
			/>
		</div>
		<div>
			<input
				type="text"
				v-model="address"
				id="address"
				name="address"
				placeholder="Company address"
				required
			/>
		</div>
		<div>
			<input
				type="integer"
				v-model="contact_no"
				id="contact_no"
				name="contact_no"
				placeholder="contact Number"
				required
			/>
		</div>
		<div><button @click="addProfile">Submit</button></div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			ischeck: false,
			name: "",
			comp_no: "",
			address: "",
			contact_no: "",
		};
	},
	methods: {
		addProfile: function () {
			if (
				this.name == "" ||
				this.comp_no == "" ||
				this.address == "" ||
				this.contact_no == ""
			) {
				this.ischeck = true;
			} else {
				console.log("sending ");
				axios
					.post("http://localhost:4030/users/provider/profile", {
						u_id: localStorage.getItem("u_id"),
						name: this.email,
						address: this.address,
						number: this.comp_no,
						contact: this.contact_no,
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
