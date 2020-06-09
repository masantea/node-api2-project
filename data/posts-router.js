const express = require("express")

const router = express.Router()


router.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})

router.post("/posts", (req, res) => {
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

router.post("/posts/:id/comments", (req, res) => {
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	posts.insertComment(req.body)
		.then((comment) => {
			res.status(201).json(comment)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the user",
			})
		})
})


router.get("/posts", (req, res) => {
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

router.get("/posts/:id", (req, res) => {
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

router.get("/posts/:id/comments", (req, res) => {
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


router.delete("/posts/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(post).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
		})
})

router.put("/posts/:id", (req, res) => {
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	posts.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
		})
})

module.exports = router