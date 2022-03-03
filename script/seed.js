"use strict"

const {
	db,
	models: { User, Author, Book, Genre, Comment }
} = require("../server/db")

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }) // clears db and matches models to tables
	console.log("db synced!")

	// Creating Users
	const [user1, user2, user3, user4, user5, user6] = await Promise.all([
		User.create({
			name: "Cody",
			username: "cody",
			email: "cody@cody.com",
			password: "banana",
			role: "user"
		}),
		User.create({
			name: "Arthur",
			username: "arthur",
			email: "arthur@arthur.com",
			password: "chocolate",
			role: "user"
		}),
		User.create({
			name: "Daniel",
			username: "daniel",
			email: "daniel@daniel.com",
			password: "pineapple",
			role: "user"
		}),
		User.create({
			name: "HandsomeBob",
			username: "handsomeBob",
			email: "bob@handsomebob.com",
			password: "cat",
			role: "admin"
		}),
		User.create({
			name: "Joe",
			username: "joe",
			email: "joe@joe.com",
			password: "penny",
			role: "admin"
		}),
		User.create({
			name: "Rusty",
			username: "rusty",
			email: "rusty@rusty.com",
			password: "callum",
			role: "admin"
		})
	])

	// Creating Authors
	const [author1, author2, author3, author4, author5, author6, author7] =
		await Promise.all([
			Author.create({
				name: "J.K. Rowling",
				bio: "Joanne Rowling, known by her pen name J.K. Rowling, is a British author, philanthropist, film producer, and screenwriter."
			}),
			Author.create({
				name: "Ernest Hemingway",
				bio: "Ernest Miller Hemingway was an American novelist, short-story writer, journalist, and sportsman. "
			}),
			Author.create({
				name: "Hakuri Murakami",
				bio: "Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan as well as internationally, with his work translated into 50 languages and selling millions of copies outside Japan. "
			}),
			Author.create({
				name: "J.R.R. Tolkien",
				bio: "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings. "
			}),
			Author.create({
				name: "George R.R. Martin",
				bio: "George Raymond Richard Martin is the author of the series of epic fantasy novels A Song of Ice and Fire, which were adapted into the Emmy Award-winning HBO series Game of Thrones. "
			}),
			Author.create({
				name: "C.S. Lewis",
				bio: "Clive Staples Lewis was a British writer and lay theologian. He held academic positions in English literature at both Oxford University and Cambridge University."
			}),
			Author.create({
				name: "Shel Silverstein",
				bio: "Sheldon Allan Silverstein was an American writer, poet, cartoonist, songwriter, and playwright. Born and raised in Chicago, Illinois, Silverstein briefly attended university before being drafted into the United States Army."
			})
		])

	// Creating Books
	const [book1, book2, book3, book4] = await Promise.all([
		Book.create({
			name: 'The Giving Tree',
			imageURL:
				'https://upload.wikimedia.org/wikipedia/en/7/79/The_Giving_Tree.jpg',
			description:
				'Every day the boy would come to the tree to eat her apples, swing from her branches, or slide down her trunk...and the tree was happy. But as the boy grew older he began to want more from the tree, and the tree gave and gave and gave. This is a tender story, touched with sadness, aglow with consolation.',
			inventory: 8,
			price: 16.19
		}),
		Book.create({
			name: "Harry Potter and the Order of the Phoenix",
			imageURL:
				"https://images-na.ssl-images-amazon.com/images/I/51lFAzVQUxL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
			description:
				"As his fifth year at Hogwarts School of Witchcraft and Wizardry approaches, 15-year-old Harry Potter is in full-blown adolescence, complete with regular outbursts of rage, a nearly debilitating crush, and the blooming of a powerful sense of rebellion. It's been yet another infuriating and boring summer with the despicable Dursleys, this time with minimal contact from our hero's non-Muggle friends from school. Harry is feeling especially edgy at the lack of news from the magic world, wondering when the freshly revived evil Lord Voldemort will strike.",
			inventory: 4,
			price: 13.69
		}),
		Book.create({
			name: "Lord of the Rings: The Fellowship of the Ring",
			imageURL:
				"https://images-na.ssl-images-amazon.com/images/I/41gHG-a2OEL._SX331_BO1,204,203,200_.jpg",
			description:
				"The first volume in J.R.R. Tolkien's epic adventure THE LORD OF THE RINGS One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.",
			inventory: 6,
			price: 10.09
		}),
		Book.create({
			name: "A Game of Thrones: A Song of Ice and Fire",
			imageURL:
				"https://images-na.ssl-images-amazon.com/images/I/51DGe0uFHCL._SX330_BO1,204,203,200_.jpg",
			description:
				"Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King’s Landing.",
			inventory: 5,
			price: 15.49
		})
	])

	// Creating Genres
	const genres = await Promise.all([
		Genre.create({ name: "Sci Fi" }),
		Genre.create({ name: "Children" }),
		Genre.create({ name: "Fantasy" })
	])

	const [comment1, comment2, commment3, comment4] = await Promise.all([
		Comment.create({ message: "This is the best book in the series!!!" }),
		Comment.create({ message: "I like the movie better." }),
		Comment.create({ message: "I would buy this again!" }),
		Comment.create({ message: "I cannot wait till they make this book an anime!" })
	])

	// Adding Author-Book Association
	await author1.addBook(book2)
	await author4.addBook(book3)
	await author5.addBook(book4)
	await author7.addBook(book1)

	await book2.addComment(comment1)
	await book2.addComment(comment2)
	await book2.addComment(comment4)

	await user5.addComment(comment2)
	await user6.addComment(comment4)

	console.log(`seeded ${users.length} users`)
	console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
console.log("seeding...")
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log("closing db connection")
		await db.close()
		console.log("db connection closed")

	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
	runSeed()
}
