import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList.js";
import { MongoClient } from "mongodb";
import Head from "next/head.js";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "A First Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg",
        address: "Some address 5, 12345 Some City",
        description: "This is a first meetup!",
    },
    {
        id: "m2",
        title: "A Second Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg",
        address: "Some address 10, 12345 Some City",
        description: "This is a second meetup!",
    },
];

export default function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);

    // return <MeetupList meetups={loadedMeetups} />;
    return (
        <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse a huge list of highly active React meetups!" />
        </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

export async function getStaticProps() {
    const client = await MongoClient.connect(
        "mongodb+srv://mazenbashammakh1:tu1JB359Vh04hgyt@cluster0.g03jj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
    };
}
