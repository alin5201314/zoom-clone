"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const EndCallButton = () => {
    const call = useCall();
    const router = useRouter();

    if (!call)
        throw new Error(
        'useStreamCall must be used within a StreamCall component.',
        );
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
  
    const isMeetingOwner = localParticipant &&
     call?.state.createdBy && localParticipant.userId === 
     call.state.createdBy.id;
    
    if (!isMeetingOwner) return null;
    return (
      <Button onClick={async()=>{
        await call.endCall()
        router.push('/')
      }} className='bg-red-500'>
        End Call for everyone
      </Button>
  )
}
 
export default EndCallButton