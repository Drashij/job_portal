import login from "./components/common/login.vue";
import register from "./components/common/register.vue";
import home from "./components/common/home.vue";
import profile from "./components/job-provider/profile.vue";
import provider from "./components/job-provider/provider.vue";
import seeker from "./components/job-seeker/seeker.vue";
import sProfile from "./components/job-seeker/sProfile.vue";
import allJobs from "./components/job-provider/allJobs.vue";
import job from "./components/job-provider/job.vue";
import status from "./components/job-seeker/status.vue";
export default [
	{ path: "/", component: home },
	{ path: "/provider", component: provider },
	{ path: "/seeker", component: seeker },
	{ path: "/register", component: register },
	{ path: "/profile", component: profile },
	{ path: "/sProfile", component: sProfile },
	{ path: "/allJobs", component: allJobs },
	{ path: "/job", component: job },

	{ path: "/login", component: login },
	{ path: "/status", component: status },
];
