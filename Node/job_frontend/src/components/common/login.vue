<template>
	<div class="logi">
		<p v-if="ierr">Wrong id or password</p>
		<p v-if="ischeck">Email and Password required</p>
		<h1>Please Login to continue</h1>

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

		<div>
			<button @click="login">Login</button>
		</div>

		<button @click="log">Register</button>
		<button @click="home" style="margin-left: 20px">Home</button>
	</div>
</template>
<script>
import axios from "axios";

export default {
	data() {
		return {
			ierr: false,
			ischeck: false,
			email: "",
			password: "",
			arr: [],
			dataa: "",
		};
	},
	methods: {
		log: function () {
			this.$router.push("register");
		},
		home: function () {
			this.$router.push("/");
		},
		login: function () {
			if (this.email == "" || this.password == "") {
				this.ischeck = true;
			} else {
				console.log("this is sending email" + this.email);
				console.log("this is sending password" + this.password);
				axios
					.post("http://localhost:4030/users/login", {
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						console.log(response.data.data[0].profile);
						this.$session.start();
						this.$session.set("jwt", response.data.token);

						localStorage.setItem("id", response.data.data[0].id);
						if (response.data.data[0].profile == "provider") {
							localStorage.setItem("isPlogin", true);
							this.$router.push("/provider");
						} else {
							localStorage.setItem("isSlogin", true);
							this.$router.push("/seeker");
						}
					})
					.catch((error) => {
						this.ierr = true;
						console.log("wrong id or password");
						console.log(error);
					});
			}
		},
	},
};
</script>
<style scoped>
.logi {
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
p {
	color: black;
	font-size: 14px;
}
</style>
