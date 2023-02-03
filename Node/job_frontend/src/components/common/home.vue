<template>
	<div class="greetings" id="">
		<h1>Welcome to job portal</h1>
		<button @click="log">want a job ?</button>
		<button @click="log">post a job</button>
	</div>
</template>
<script>
export default {
	methods: {
		log: function () {
			this.$router.push("register");
		},
	},
};
</script>
<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	top: -10px;
}

h3 {
	font-size: 1.2rem;
}
button {
	background-color: #04aa6d;
	padding: 10px 20px;
	border-radius: 3px;
	margin-top: 10px;
	margin-bottom: 7px;
	margin-right: 20px;
	transition: 300ms;
}
button:hover {
	background-color: #ebf3f7;
}
.greetings h1,
.greetings h3 {
	text-align: center;
}

@media (min-width: 1024px) {
	.greetings h1,
	.greetings h3 {
		display: block;
		text-align: left;
	}
}
</style>
