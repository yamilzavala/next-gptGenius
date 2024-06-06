import { UserProfile } from "@clerk/nextjs";
import { currentUser, auth  } from '@clerk/nextjs/server';
import { fetchUserTokensById } from '@/utils/actions';

const UserProfilePage = async () => {
    const { userId } = auth();
    //const currentTokens = await fetchUserTokensById(userId);
    const user = await currentUser();
    if(!user) return <div>No user logged</div>
    return (
        <div>
          {/* <h2 className='mb-8 ml-8 text-xl font-extrabold'>
            Token Amount : {currentTokens}
          </h2> */}
          <UserProfile routing='hash' />
        </div>
    );
};

export default UserProfilePage;