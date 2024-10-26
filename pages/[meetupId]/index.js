import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head.js";

export default function MeetupDetailsPage(props) {
    return (
        <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description} />
        </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://mazenbashammakh1:tu1JB359Vh04hgyt@cluster0.g03jj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString(),
            },
        })),
        // [
        //     {
        //         params: {
        //             meetupId: "m1",
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: "m1",
        //         },
        //     },
        // ],
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    console.log(meetupId);

    const client = await MongoClient.connect(
        "mongodb+srv://mazenbashammakh1:tu1JB359Vh04hgyt@cluster0.g03jj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
            },
        },
    };
}
