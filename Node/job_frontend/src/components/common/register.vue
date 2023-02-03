<template>
	<div class="regi">
		<p v-if="ischeck">Please fill all the fields</p>
		<p>{{ msg }}</p>
		<h1>Register</h1>

		<div>
			<input
				type="email"
				v-model="email"
				id="email"
				name="email"
				placeholder="Email"
				required
			/>
		</div>
		<div>
			<input
				type="password"
				v-model="password"
				id="password"
				name="password"
				placeholder="Password"
				required
			/>
		</div>
		<div style="margin: 15px">
			<label for="user">Choose user type:</label>
			<select
				name="user"
				id="user"
				v-model="profile"
				style="width: 200px; height: 30px; font-size: 20px"
			>
				<option value="provider">Job provider</option>
				<option value="seeker">Job seeker</option>
			</select>
		</div>

		<div>
			<button @click="createUser">Register</button>
		</div>

		<button @click="log">Already registered? Login here</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			msg: "",
			ischeck: false,
			email: "",
			password: "",
			profile: "",
			p: "",

			arr: [
				{
					email: "",
					password: "",
					profile: "",
				},
			],
		};
	},
	methods: {
		log: function () {
			this.$router.push("/login");
		},
		createUser: function () {
			if (this.email == "" || this.password == "" || this.profile == "") {
				this.ischeck = true;
			} else {
				console.log("sending " + this.profile);
				axios
					.post("http://localhost:4030/users/register", {
						email: this.email,
						password: this.password,
						profile: this.profile,
					})
					.then((response) => {
						console.log(response.data);
						if (response.data == "Email already registered") {
							this.msg = response.data;
						} else if (this.profile === "provider") {
							localStorage.setItem("u_id", response.data.data.id);
							this.$router.push("/profile");
						} else {
							localStorage.setItem("u_id", response.data.data.id);
							this.$router.push("/sProfile");
						}
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
.regi {
	text-align: center;
	margin-left: 35rem;
}
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
	padding: 10px 20px;
	border-radius: 3px;
	margin-top: 10px;
	margin-bottom: 7px;
	transition: 300ms;
}
button:hover {
	background-color: #ebf3f7;
}
</style>
