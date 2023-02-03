<template>
	<div id="">
		<header>
			<button @click="logout" style="margin-right: 20px">logout</button>
			<button @click="gotoAll" style="margin-right: 20px">My Jobs</button>
			<button @click="">My Profile</button>
		</header>
		<main style="margin-left: 30rem">
			<p v-if="ischeck">Please fill all the details</p>
			<h1>Hi {{ name }}</h1>
			<button @click="isjob = !isjob">post a new job</button>
		</main>
		<div v-if="isjob" id="provider" style="margin-left: 30rem">
			<div style="margin: 15px">
				<label for="user">Choose Category :</label>
				<select
					name="user"
					id="user"
					v-model="category"
					style="width: 200px; height: 30px; font-size: 20px"
				>
					<option value="Engineering">Engineering</option>
					<option value="analysis">Data analysis</option>
					<option value="entry">Data entry</option>
					<option value="Business">Business</option>
					<option value="other">other</option>
				</select>
			</div>
			<div>
				<input
					type="text"
					v-model="J_name"
					id="j_name"
					name="j_name"
					placeholder="Job Name"
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
					type="text"
					v-model="experience"
					id="experience"
					name="experience"
					placeholder="Experience in Years"
					required
				/>
			</div>
			<div>
				<input
					type="text"
					v-model="salary"
					id="salary"
					name="salary"
					placeholder="Salary in rs"
					required
				/>
			</div>
			<div>
				<input
					type="text"
					v-model="location"
					id="location"
					name="location"
					placeholder="location"
					required
				/>
			</div>

			<button @click="postJob">Post</button>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			isjob: false,
			ischeck: false,
			name: "",
			g_id: "",
			category: "",
			J_name: "",
			skills: "",
			experience: "",
			salary: "",
			location: "",
		};
	},
	methods: {
		gotoAll: function () {
			this.$router.push("/allJobs");
		},
		logout: function () {
			localStorage.clear();
			this.$router.push("/");
			this.$session.destroy();
		},
		postJob: function () {
			this.isjob = true;

			if (
				this.category == "" ||
				this.J_name == "" ||
				this.skills == "" ||
				this.experience == "" ||
				this.salary == "" ||
				this.location == ""
			) {
				this.ischeck = true;
			} else {
				console.log("sending ");
				const i = this.g_id;
				axios
					.post(`http://localhost:4030/users/job/${i}`, {
						category: this.category,
						name: this.J_name,
						skills: this.skills,
						experience: this.experience,
						salary: this.salary,
						location: this.location,
					})
					.then((response) => {
						console.log(response.data);
						this.isjob = false;
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
	},
	created() {
		if (!localStorage.getItem("isPlogin")) {
			this.$router.push("/");
		} else {
			const id = localStorage.getItem("id");
			axios
				.get(`http://localhost:4030/users/provider/${id}`)
				.then((response) => {
					console.log(response.data);
					this.name = response.data[0].name;
					console.log(response.data[0].g_id);
					this.g_id = response.data[0].g_id;
					localStorage.setItem("g_id", this.g_id);
				})
				.catch((error) => {
					this.ierr = true;
					console.log("wrong id or password");
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
#provider {
	max-width: 1280px;
	margin: 0 auto;
	padding: 3rem;
	font-weight: normal;
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
