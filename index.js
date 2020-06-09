const express = require("express")
const posts = require("./data/db.js")

const server = express()
const port = 4000

server.use(express.json())


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

server.get("/posts", (req, res) => {
	posts.find()
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the users",
			})
		})
})

server.get("/posts/:id", (req, res) => {
	posts.findById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({
					message: "User not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the user",
			})
		})
})

server.get("/posts/:id/comments", (req, res) => {
	posts.findById(req.params.id)
		.then((post) => {
			if (!post) {
				// cancelling a request is tricky from inside a promise chain,
				// so instead we're using an if/else statement.
				res.status(404).json({
					message: "User not found",
				})
			} else {
				// this is returning a new promise in the chain, so we get
				// the result in the next `.then` call.
				return posts.findPostComments(req.params.id)
			}

		})
		.then((comments) => {
			res.json(comments)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error getting the user",
			})
		})
})

server.post("/posts", (req, res) => {
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})

server.post("/posts", (req, res) => {
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	posts.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})


// server.put("/users/:id", (req, res) => {
// 	if (!req.body.name || !req.body.email) {
// 		return res.status(400).json({
// 			message: "Missing user name or email",
// 		})
// 	}

// 	users.update(req.params.id, req.body)
// 		.then((user) => {
// 			if (user) {
// 				res.status(200).json(user)
// 			} else {
// 				res.status(404).json({
// 					message: "The user could not be found",
// 				})
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 			res.status(500).json({
// 				message: "Error updating the user",
// 			})
// 		})
// })

// server.delete("/users/:id", (req, res) => {
// 	users.remove(req.params.id)
// 		.then((count) => {
// 			if (count > 0) {
// 				res.status(200).json({
// 					message: "The user has been nuked",
// 				})
// 			} else {
// 				res.status(404).json({
// 					message: "The user could not be found",
// 				})
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 			res.status(500).json({
// 				message: "Error removing the user",
// 			})
// 		})
// })