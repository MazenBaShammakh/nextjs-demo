import {MongoClient} from 'mongodb'

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://mazenbashammakh1:tu1JB359Vh04hgyt@cluster0.g03jj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne({
            title,
            image,
            address,
            description
        });

        console.log(result);
        client.close();

        res.status(201).json({message: 'Meetup inserted!'});

    }
}

export default handler;
