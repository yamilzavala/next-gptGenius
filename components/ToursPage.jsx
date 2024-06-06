
'use client';
import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';
import TourInfo from './TourInfo';
import { useState } from 'react';

const ToursPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const {data, isPending} = useQuery({
        queryKey: ['tours', searchValue],
        queryFn: async () => getAllTours(searchValue)
    })

    return (
        <>  
        <div className="grid grid-cols-1 gap-8">
            <form className='max-w-lg mb-12'>
                <div className="join w-full">                    
                    <input type="text" name="search" placeholder='enter city or country here..' required className="input input-bordered join-item w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <button disabled={isPending} type="button" className='btn btn-primary join-item' onClick={() => setSearchValue('')}>{isPending ? 'Searching...' : 'Search'}</button>
                </div>
            </form>
            {isPending ? <span className="loading"></span> : <ToursList data={data}/>}
        </div>
        </>
    );
};

export default ToursPage;