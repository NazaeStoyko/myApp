const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { client } = require("./db");
const { ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
console.log({ port })

const corsOptions = {
    origin: ["http://localhost:3000", "https://game-pad-three.vercel.app"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const whitelist = [
    '*'
];


app.use((req, res, next) => {
    const origin = req.get('referer');
    const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if (isWhitelisted) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') res.sendStatus(200);
    else next();
});

const setContext = (req, res, next) => {
    if (!req.context) req.context = {};
    next();
};
app.use(setContext);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});

const upload = multer({ storage });

// app.get("api/products", (req, res) => {
//     const { sort, filterMinPrice, filterMaxPrice } = req.query;
//     const collection = client.db("server").collection("products");

//     let filterOptions = {};
//     if (filterMinPrice && filterMaxPrice) {
//         filterOptions = {
//             price: {
//                 $gte: parseInt(filterMinPrice), // Filter by minimum price
//                 $lte: parseInt(filterMaxPrice), // Filter by maximum price
//             },
//         };
//     }

//     let sortOption = {};
//     if (sort === "lowest") {
//         sortOption = { price: 1 }; // Sort by ascending price
//     } else if (sort === "highest") {
//         sortOption = { price: -1 }; // Sort by descending price
//     }

//     collection
//         .find(filterOptions)
//         .sort(sortOption)
//         .toArray()
//         .then((products) => {
//             res.json(products);
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(500).json({ success: false, error: "Internal Server Error" });
//         });
// });

app.get("/products", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("server");
        const products = db.collection("products");
        const listOfProducts = await products.find({}).toArray();

        res.json(listOfProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("api/products", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("server");
        const products = db.collection("products");
        const listOfProducts = await products.find({}).toArray();

        res.json(listOfProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/user", async (req, res) => {
    console.log('into user endpoint')
    try {
        await client.connect();
        console.log('into user endpoint::connected to db')

        const db = client.db("server");
        const users = db.collection("users");
        const admin = await users.findOne({ name: "Nazar" });
        console.log({ admin })
        res.json(admin);
    } catch (error) {
        console.log('into user endpoint:error')

        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("api/user", async (req, res) => {
    console.log('into user endpoint')
    try {
        await client.connect();
        console.log('into user endpoint::connected to db')

        const db = client.db("server");
        const users = db.collection("users");
        const admin = await users.findOne({ name: "Nazar" });
        console.log({ admin })
        res.json(admin);
    } catch (error) {
        console.log('into user endpoint:error')

        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("api/add_product", upload.single("photo"), async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const photoPath = req.file.path;

        await client.connect();
        const db = client.db("server");
        const products = db.collection("products");

        const insertedProduct = await products.insertOne({ name, price, photoPath });

        res.json(insertedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("api/delete_product", async (req, res) => {
    try {
        const id = req.body.id;

        await client.connect();
        const db = client.db("server");
        const products = db.collection("products");

        const deleted = await products.deleteOne({ _id: new ObjectId(id) });
        console.log({ deleted });
        res.json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("api/product_update", async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;

        await client.connect();
        const db = client.db("server");
        const products = db.collection("products");

        const updatedProduct = await products.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price } }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
