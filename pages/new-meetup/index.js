import React from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';
import { useRouter } from 'next/router.js';
import Head from 'next/head.js';

export default function NewMeetupPage() {
  const router = useRouter();

  async function handleAddMeetup(meetupData) {
    const response = await fetch('/api/new-meetup',{
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <>
      <Head>
            <title>Add a New Meetup</title>
            <meta name="description" content="Add your own meetups & create amazing networking opportunities." />
        </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup}/>
    </>
  )
}
