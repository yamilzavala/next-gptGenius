import TourInfo from "@/components/TourInfo";
import { getSingleTour, generateTourImage } from "@/utils/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from 'next/image';
import axios from "axios";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({params}) => {
    const tour = await getSingleTour(params.id)
    // const tourImg = await generateTourImage({city: tour.city, country: tour.country})
    const {data} = await axios(`${url}${tour.city}`);
    const tourImg = await data?.results[0]?.urls?.regular; 


    if(!tour) redirect('/tours')
    return (
        <div>
            <Link href="/tours" className='btn btn-secondary mb-12'>
                back to tours
            </Link>

            {tourImg ? (
                <div>
                    <Image    
                    src={tourImg}
                    width={300}
                    height={300}
                    className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
                    alt={tour.title}
                    priority/>
                </div> 
            ) :
                null
            }

            <TourInfo tour={tour}/>
        </div>
    );
};

export default SingleTourPage;