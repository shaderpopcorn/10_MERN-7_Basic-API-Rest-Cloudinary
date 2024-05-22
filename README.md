# 10_MERN-7_Basic-API-Rest+Cloudinary

ENDPOINTS FOR GENERAL BOOK CRUD REQUESTS:

Get All Books -> http://localhost:4001/api/book/

Get Book By Id -> http://localhost:4001/api/book/<id_of_book>

New Book -> http://localhost:4001/api/book/

Update Book By Id -> http://localhost:4001/api/book/<id_of_book>

New Book Image By Id -> http://localhost:4001/api/book/image/<id_of_book>

Delete Book By Id -> http://localhost:4001/api/book/<id_of_book>

Book schema to use for JSON object at 'New Book' and 'Update Book By Id':

title: { type: String, required: true, trim: true },

cover: { type: String, required: true, trim: true },

author: { type: String, required: true, trim: true },

stock: { type: Boolean, required: true, default: true },

price: { type: Number, required: true },

language: {
type: String,
required: true,
enum: ["german", "english", "spanish", "portuguese"],
trim: true,
},

ENDPOINTS FOR GENERAL CATEGORY CRUD REQUESTS:

Get All Categories -> http://localhost:4001/api/category/ //GET

Get Category By Id -> http://localhost:4001/api/category/<id_of_category> //GET

New Category -> http://localhost:4001/api/category/ // POST

Update Category By Id -> http://localhost:4001/api/category/<id_of_category> // PUT

Delete Category By Id -> http://localhost:4001/api/category/<id_of_category> // DELETE

Category schema to use for JSON object at 'New Category' and 'Update Category By Id':

name: { type: String, required: true, trim: true },

icon: { type: String, required: true, trim: true },

isle: { type: Number, required: true },

floor: {
type: String,
required: true,
enum: ["GF", "FF", "SF", "TF"],
trim: true,
},

image: { type: String, required: false, trim: true },

books: [{ type: mongoose.Types.ObjectId, ref: "books" }],

ENDPOINTS FOR GENERAL USER REQUESTS:

Register new user -> http://localhost:4001/api/auth/register

Login user -> http://localhost:4001/api/auth/login

Upload avatar image -> http://localhost:4001/api/auth/avatar

User schema to use for JSON object at 'Register':

email: { type: String, required: true },

username: { type: String, required: true },

password: { type: String, required: true },

User schema to use for JSON object at 'Avatar':

avatar: { type: String, required: false },
