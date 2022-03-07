'use strict';

const {
	db,
	models: { User, Author, Book, Genre, Comment, Cart, CartItem }
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users
	const [user1, user2, user3, user4, user5, user6] = await Promise.all([
		User.create({
			name: 'Cody',
			username: 'cody',
			email: 'cody@cody.com',
			password: 'banana',
			role: 'user'
		}),
		User.create({
			name: 'Arthur',
			username: 'arthur',
			email: 'arthur@arthur.com',
			password: 'chocolate',
			role: 'user'
		}),
		User.create({
			name: 'Daniel',
			username: 'daniel',
			email: 'daniel@daniel.com',
			password: 'pineapple',
			role: 'user'
		}),
		User.create({
			name: 'HandsomeBob',
			username: 'handsomeBob',
			email: 'bob@handsomebob.com',
			password: 'cat',
			role: 'admin'
		}),
		User.create({
			name: 'Joe',
			username: 'joe',
			email: 'joe@joe.com',
			password: 'penny',
			role: 'admin'
		}),
		User.create({
			name: 'Rusty',
			username: 'rusty',
			email: 'rusty@rusty.com',
			password: 'callum',
			role: 'admin'
		})
	]);

	// Creating Authors
	const [
		author1,
		author2,
		author3,
		author4,
		author5,
		author6,
		author7,
		author8,
		author9,
		author10,
		author11,
		author12,
		author13,
		author14,
		author15
	] = await Promise.all([
		Author.create({
			name: 'J.K. Rowling',
			bio: 'Joanne Rowling, known by her pen name J.K. Rowling, is a British author, philanthropist, film producer, and screenwriter.'
		}),
		Author.create({
			name: 'Ernest Hemingway',
			bio: 'Ernest Miller Hemingway was an American novelist, short-story writer, journalist, and sportsman. '
		}),
		Author.create({
			name: 'Hakuri Murakami',
			bio: 'Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan as well as internationally, with his work translated into 50 languages and selling millions of copies outside Japan. '
		}),
		Author.create({
			name: 'J.R.R. Tolkien',
			bio: 'John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings. '
		}),
		Author.create({
			name: 'George R.R. Martin',
			bio: 'George Raymond Richard Martin is the author of the series of epic fantasy novels A Song of Ice and Fire, which were adapted into the Emmy Award-winning HBO series Game of Thrones. '
		}),
		Author.create({
			name: 'C.S. Lewis',
			bio: 'Clive Staples Lewis was a British writer and lay theologian. He held academic positions in English literature at both Oxford University and Cambridge University.'
		}),
		Author.create({
			name: 'Shel Silverstein',
			bio: 'Sheldon Allan Silverstein was an American writer, poet, cartoonist, songwriter, and playwright. Born and raised in Chicago, Illinois, Silverstein briefly attended university before being drafted into the United States Army.'
		}),
		Author.create({
			name: 'Michelle Zauner',
			bio: 'Michelle Zauner is best known as a singer and guitarist who creates dreamy, shoegaze-inspired indie pop under the name Japanese Breakfast. She has won acclaim from major music outlets around the world for releases like Psychopomp (2016) and Soft Sounds from Another Planet (2017). '
		}),
		Author.create({
			name: 'Brit Bennett',
			bio: 'Born and raised in Southern California, Brit Bennett graduated from Stanford University and later earned her MFA in fiction at the University of Michigan, where she won a Hopwood Award in Graduate Short Fiction as well as the 2014 Hurston/Wright Award for College Writers'
		}),
		Author.create({
			name: 'Blake Crouch',
			bio: 'Blake Crouch is a bestselling novelist and screenwriter. He is the author of the forthcoming novel, Dark Matter, for which he is writing the screenplay for Sony Pictures.'
		}),
		Author.create({
			name: 'Taylor Jenkins Reid',
			bio: 'Taylor Jenkins Reid is the New York Times bestselling author of Malibu Rising, Daisy Jones & The Six, and The Seven Husbands of Evelyn Hugo, as well as four other novels. Her newest novel, Malibu Rising, is out now.'
		}),
		Author.create({
			name: 'Robert Kirkman',
			bio: 'Robert Kirkman is an American comic book writer best known for his work on The Walking Dead, Invincible for Image Comics, as well as Ultimate X-Men and Marvel Zombies for Marvel Comics.'
		}),
		Author.create({
			name: 'Kohei Horikoshi',
			bio: `Born 1986 in the prefecture Aichi, Horikoshi first attracted attention in the second half of 2006 when he entered Shueisha's 72th Tezuka Award for Newcomers with his one shot "Nukegara" and made it to the final six, where he gained himself an "Honorable Mention".`
		}),
		Author.create({
			name: 'Jacqueline Rayner',
			bio: `Jacqueline Rayner is a best selling British author, best known for her work with the licensed fiction based on the long-running British science fiction television series Doctor Who.`
		}),
		Author.create({
			name: 'AidaIro',
			bio: `AidaIro is a Japanese mangaka. (less)`
		})
	]);

	// Creating Books
	const [
		book1,
		book2,
		book3,
		book4,
		book5,
		book6,
		book7,
		book8,
		book9,
		book10,
		book11,
		book12,
		book13,
		book14,
		book15,
		book16
	] = await Promise.all([
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
			name: 'Harry Potter and the Order of the Phoenix',
			imageURL:
				'https://images-na.ssl-images-amazon.com/images/I/51lFAzVQUxL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
			description:
				"As his fifth year at Hogwarts School of Witchcraft and Wizardry approaches, 15-year-old Harry Potter is in full-blown adolescence, complete with regular outbursts of rage, a nearly debilitating crush, and the blooming of a powerful sense of rebellion. It's been yet another infuriating and boring summer with the despicable Dursleys, this time with minimal contact from our hero's non-Muggle friends from school. Harry is feeling especially edgy at the lack of news from the magic world, wondering when the freshly revived evil Lord Voldemort will strike.",
			inventory: 4,
			price: 13.69
		}),
		Book.create({
			name: 'Lord of the Rings: The Fellowship of the Ring',
			imageURL:
				'https://images-na.ssl-images-amazon.com/images/I/41gHG-a2OEL._SX331_BO1,204,203,200_.jpg',
			description:
				"The first volume in J.R.R. Tolkien's epic adventure THE LORD OF THE RINGS One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.",
			inventory: 6,
			price: 10.09
		}),
		Book.create({
			name: 'A Game of Thrones: A Song of Ice and Fire',
			imageURL:
				'https://images-na.ssl-images-amazon.com/images/I/51DGe0uFHCL._SX330_BO1,204,203,200_.jpg',
			description:
				'Winter is coming. Such is the stern motto of House Stark, the northernmost of the fiefdoms that owe allegiance to King Robert Baratheon in far-off King’s Landing.',
			inventory: 5,
			price: 15.49
		}),
		Book.create({
			name: 'Crying in H Mart: A Memoir',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601937850l/54814676.jpg',
			description:
				'An unflinching, powerful memoir about growing up Korean American, losing her mother, and forging her own identity.',
			inventory: 5,
			price: 15.95
		}),
		Book.create({
			name: 'The Vanishing Half',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1577090827l/51791252._SX318_SY475_.jpg',
			description:
				"The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities.",
			inventory: 5,
			price: 13.86
		}),
		Book.create({
			name: 'Harry Potter And The Chamber Of Secrets',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474169725l/15881._SY475_.jpg',
			description:
				"Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car!",
			inventory: 4,
			price: 6.98
		}),
		Book.create({
			name: 'Harry Potter and the Prisoner of Azkaban',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630547330l/5._SY475_.jpg',
			description:
				'For twelve long years, the dread fortress of Azkaban held an infamous prisoner named Sirius Black. Convicted of killing thirteen people with a single curse, he was said to be the heir apparent to the Dark Lord, Voldemort.',
			inventory: 4,
			price: 8.78
		}),
		Book.create({
			name: 'Recursion',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1543687940l/42046112.jpg',
			description:
				"That's what NYC cop Barry Sutton is learning, as he investigates the devastating phenomenon the media has dubbed False Memory Syndrome—a mysterious affliction that drives its victims mad with memories of a life they never lived.",
			inventory: 5,
			price: 11.99
		}),
		Book.create({
			name: 'The Seven Husbands of Evelyn Hugo',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498169036l/32620332._SY475_.jpg',
			description:
				'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. Why her? Why now?',
			inventory: 6,
			price: 9.42
		}),
		Book.create({
			name: 'The Walking Dead, Vol. 2: Miles Behind Us',
			imageURL:
				'https://ia600604.us.archive.org/view_archive.php?archive=/22/items/olcovers293/olcovers293-L.zip&file=2936552-L.jpg',
			description:
				'The Walking Dead is a monthly black-and-white comic book series chronicling the travels of Rick Grimes, his family, and other survivors of a zombie apocalypse',
			inventory: 6,
			price: 10.33
		}),
		Book.create({
			name: 'My Hero Academia, Vol. 14',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1530434141l/36538797.jpg',
			description: `What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless?`,
			inventory: 2,
			price: 10.75
		}),
		Book.create({
			name: 'My Hero Academia, Vol. 16',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1534537655l/38926380.jpg',
			description: `What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless?`,
			inventory: 4,
			price: 10.75
		}),
		Book.create({
			name: 'My Hero Academia, Vol. 21',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555270233l/43909390.jpg',
			description: `What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless?`,
			inventory: 1,
			price: 10.75
		}),
		Book.create({
			name: 'Doctor Who: Winner Takes All',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359986346l/678080.jpg',
			description: `Rose and the Doctor return to present-day Earth, and become intrigued by the latest craze – the video game, Death to Mantodeans. Is it as harmless as it seems? And why are so many local people going on holiday and never returning? Meanwhile, on another world, an alien war is raging. The Quevvils need to find a new means of attacking the ruthless Mantodeans.`,
			inventory: 6,
			price: 13.1
		}),
		Book.create({
			name: 'Toilet-bound Hanako-kun, Vol. 1',
			imageURL:
				'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575999996l/49988130._SX318_SY475_.jpg',
			description: `"Hanako-san, Hanako-san...are you there?" At Kamome Academy, rumors abound about the school's Seven Mysteries, one of which is Hanako-san. Said to occupy the third stall of the third floor girls' bathroom in the old school building, Hanako-san grants any wish when summoned. Nene Yashiro, an occult-loving high school girl who dreams of romance, ventures into this haunted bathroom...but the Hanako-san she meets there is nothing like she imagined! Kamome Academy's Hanako-san...is a boy!`,
			inventory: 3,
			price: 13.1
		})
	]);

	// Creating Genres
	const genres = await Promise.all([
		Genre.create({ name: 'Sci Fi' }),
		Genre.create({ name: 'Children' }),
		Genre.create({ name: 'Fantasy' })
	]);

	const [comment1, comment2, comment3, comment4] = await Promise.all([
		Comment.create({ message: 'This is the best book in the series!!!' }),
		Comment.create({ message: 'I like the movie better.' }),
		Comment.create({ message: 'I would buy this again!' }),
		Comment.create({ message: 'I cannot wait till they make this book an anime!' })
	]);

	// Creating Carts
	const [cart1, cart2, cart3, cart4, cart5] = await Promise.all([
		Cart.create({ purchased: false }),
		Cart.create({ purchased: true }),
		Cart.create({ purchased: false }),
		Cart.create({ purchased: true }),
		Cart.create({ purchased: true })
	]);

	// Adding Author-Book Association
	await author1.addBook(book2);
	await author1.addBook(book7);
	await author1.addBook(book8);
	await author4.addBook(book3);
	await author5.addBook(book4);
	await author7.addBook(book1);
	await author8.addBook(book5);
	await author9.addBook(book6);
	await author10.addBook(book9);
	await author11.addBook(book10);
	await author12.addBook(book11);
	await author13.addBooks([book12, book13, book14]);
	await author14.addBook(book15);
	await author15.addBook(book16);

	// Adding User-Cart Association
	await user1.addCart(cart1);
	await user1.addCart(cart2);
	await user2.addCart(cart3);
	await user3.addCart(cart4);
	await user4.addCart(cart5);

	// Adding Book-Cart Association
	await Promise.all([
		CartItem.create({ book_id: 1, cart_id: 1 }),
		CartItem.create({ book_id: 2, cart_id: 2 }),
		CartItem.create({ book_id: 2, cart_id: 3}),
		CartItem.create({ book_id: 2, cart_id: 4 }),
		CartItem.create({ book_id: 2, cart_id: 5 }),
		CartItem.create({ book_id: 3, cart_id: 1 }),
		CartItem.create({ book_id: 4, cart_id: 1 }),
	]);

	// Adding Comment-Book Association
	await book2.addComment(comment1);
	await book2.addComment(comment2);
	await book2.addComment(comment4);
	await book8.addComment(comment3);

	await user5.addComment(comment2);
	await user6.addComment(comment4);
	await user1.addComment(comment1);
	await user2.addComment(comment3);

	// console.log(`seeded ${users.length} users`)
	console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
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
	runSeed();
}
