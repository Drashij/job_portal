const Pool = require("pg").Pool;

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "Drashi@77",
	database: "job",
});
const createUser = (req, res) => {
	const paramt = req.body;

	const email = paramt.email;
	const password = paramt.password;
	const profile = paramt.profile;
	pool.query(
		`SELECT * FROM users
		        WHERE email = $1`,
		[email],
		(err, results) => {
			if (err) {
				console.log(err);
			}

			if (results.rows.length > 0) {
				res.json("Email already registered");
			} else {
				pool.query(
					`INSERT INTO users (email, password, profile)
		                VALUES ($1, $2, $3)
		                RETURNING id, password`,
					[email, password, profile],
					(err, results) => {
						if (err) {
							throw err;
						}
						res.status(200).json({
							msg: "data created successfully",

							data: results.rows[0],
						});
					}
				);
			}
		}
	);
};
const getlogin = (req, res) => {
	const arr = req.body;
	const email = arr.email;
	const password = arr.password;

	pool.query(
		`select id,profile from users where email=$1 and password=$2`,
		[email, password],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
				data: result.rows,
			});
		}
	);
};
const pProfile = (req, res) => {
	const paramt = req.body;

	const u_id = paramt.u_id;
	const name = paramt.name;
	const address = paramt.address;
	const number = paramt.number;
	const contact = paramt.contact;
	pool.query(
		`INSERT INTO givers (u_id, name, address, number, contact)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
		[u_id, name, address, number, contact],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				data: result.rows,
			});
		}
	);
};
const sProfile = (req, res) => {
	const paramt = req.body;

	const u_id = paramt.u_id;
	const name = paramt.name;
	const address = paramt.address;
	const skills = paramt.skills;
	const experience = paramt.experience;
	const contact = paramt.contact;
	pool.query(
		`INSERT INTO seekers (u_id, name, address, skills, experience, contact)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
		[u_id, name, address, skills, experience, contact],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				data: result.rows,
			});
		}
	);
};
const getProviderById = async (req, res) => {
	let u_id = parseInt(req.params.id);
	var data = await pool.query(`select * from givers where u_id =$1`, [u_id]);
	return res.json(data.rows);
};
const getSeekerById = async (req, res) => {
	let u_id = parseInt(req.params.id);
	var data = await pool.query(`select * from seekers where u_id =$1`, [u_id]);

	return res.json(data.rows);
};
const getSeekerBySId = async (req, res) => {
	let s_id = parseInt(req.params.id);
	var data = await pool.query(`select * from seekers where s_id =$1`, [s_id]);

	return res.json(data.rows);
};
const setStatus = (req, res) => {
	let s_id = parseInt(req.params.id);
	const para = req.body;
	const status = para.status;
	const j_id = para.j_id;
	pool.query(
		`UPDATE relation SET status =$1 WHERE s_id=$2 and j_id=$3`,
		[status, s_id, j_id],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				data: result.rows,
			});
		}
	);
};

const postJob = (req, res) => {
	let g_id = parseInt(req.params.id);
	const para = req.body;
	const category = para.category;
	const name = para.name;
	const skills = para.skills;
	const experience = para.experience;
	const salary = para.salary;
	const location = para.location;
	pool.query(
		`INSERT INTO jobs (g_id, category, name, skills, experience, salary, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
		[g_id, category, name, skills, experience, salary, location],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				data: result.rows,
			});
		}
	);
};
const getPjobs = (req, res) => {
	let g_id = parseInt(req.params.id);

	pool.query(`select * from jobs where g_id=$1`, [g_id], (err, result) => {
		if (err) {
			{
				console.log(err);

				throw err;
			}
		}

		res.json({
			data: result.rows,
		});
	});
};
const deleteJob = (req, res) => {
	const j_id = parseInt(req.params.id);

	pool.query("Delete from jobs where j_id =$1", [j_id], (err, result) => {
		if (err) {
			console.log(err);

			throw err;
		}
		res.json({
			data: "deleted successfully",
		});
	});
};
const all = (req, res) => {
	pool.query(`select * from jobs`, (err, result) => {
		if (err) {
			{
				console.log(err);

				throw err;
			}
		}

		res.json({
			data: result.rows,
		});
	});
};
const applyjob = (req, res) => {
	const para = req.body;
	const j_id = para.j_id;
	const s_id = para.s_id;
	const g_id = para.g_id;
	const status = para.status;
	const jobname = para.jobname;
	const seekername = para.seekername;
	pool.query(
		`select * from relation where j_id=$1 and s_id=$2`,
		[j_id, s_id],
		(err, results) => {
			if (results.rows.length > 0) {
				res.json("already applied");
			} else {
				pool.query(
					`INSERT INTO relation (j_id, s_id, g_id, status, jobname, seekername)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *`,
					[j_id, s_id, g_id, status, jobname, seekername],
					(err, result) => {
						if (err) {
							{
								console.log(err);

								throw err;
							}
						}

						res.json({
							data: result.rows,
						});
					}
				);
			}
		}
	);
};
const sJobs = (req, res) => {
	let s_id = parseInt(req.params.id);

	pool.query(`select * from relation where s_id=$1`, [s_id], (err, result) => {
		if (err) {
			{
				return "no jobs";
			}
		}

		res.json({
			data: result.rows,
		});
	});
};
const getJobPeople = (req, res) => {
	let j_id = parseInt(req.params.id);

	pool.query(`select * from relation where j_id=$1`, [j_id], (err, result) => {
		if (err) {
			{
				return "no jobs";
			}
		}

		res.json({
			data: result.rows,
		});
	});
};
module.exports = {
	createUser,
	getlogin,
	pProfile,
	sProfile,
	getProviderById,
	getSeekerById,
	getSeekerBySId,
	setStatus,
	postJob,
	getPjobs,
	deleteJob,
	all,
	applyjob,
	sJobs,
	getJobPeople,
};
