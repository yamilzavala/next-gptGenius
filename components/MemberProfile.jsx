import { UserButton } from '@clerk/nextjs';
import { currentUser, auth  } from '@clerk/nextjs/server';
//import { fetchOrGenerateTokens } from '@/utils/actions';

const MemberProfile = async () => {
    const user = await currentUser();
    const { userId } = auth();
   // const currentTokens = await fetchUserTokensById(userId);
    if(!user) return null;
    return (
      <div className='px-4 flex items-center gap-2'>
        {/* <h2 className='mb-8 ml-8 text-xl font-extrabold'>
          Token Amount : {currentTokens}
        </h2> */}
        <UserButton routing='hash' />
        <p>Manage account</p>
      </div>
    );
  };

export default MemberProfile;