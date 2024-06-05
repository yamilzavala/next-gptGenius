import { UserProfile } from "@clerk/nextjs";
import { currentUser, auth  } from '@clerk/nextjs/server';

const UserProfilePage = async () => {
    const user = await currentUser();
    if(!user) return <div>No user logged</div>
    return (
        <UserProfile/>
    );
};

export default UserProfilePage;