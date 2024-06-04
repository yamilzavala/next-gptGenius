'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createNewTour,
    generateTourResponse,
    getExistingTour,
  } from '@/utils/actions';
import toast from 'react-hot-toast';
import TourInfo from "./TourInfo";

const NewTour = () => {
    const {isPending, mutate:createNewTourFn, data: tour} = useMutation({
        mutationFn: async (destination) => {
           const newTour = await generateTourResponse(destination);
           console.log('===newTour===: ', newTour);
           if (newTour) {
                return newTour;
           }
           toast.error('No matching city found...');
           return null;
        },        
        
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries())
        console.log('===destination===: ', destination);
        createNewTourFn(destination)
    }

    if(isPending) {
        return <span className='loading loading-lg'></span>;
    }
   
    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit} className='max-w-2xl'>
                <h2 className=' mb-4'>Select your dream destination</h2>
                <div className="join w-full">
                    <input type="text" placeholder="city" name="city" required className="input input-bordered join-item w-full"/>
                    <input type="text" placeholder="country" name="country" required className="input input-bordered join-item w-full"/>
                    <button disabled={isPending} type="submit" className='btn btn-primary join-item'>{isPending ? 'please wait...' : 'generate tour'}</button>
                </div>
            </form>
            <div className='mt-16'>
                {tour ? <TourInfo tour={tour}/> : null}
            </div>
        </div>
    );
};

export default NewTour;