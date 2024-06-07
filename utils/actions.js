'use server'
import OpenAI from "openai";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
    try {
        const response = await openai.chat.completions.create({
            messages: [
                {role:'system', content: 'you are a helpful assistant'},
                ...chatMessages
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0,
            max_tokens: 100
        })    
        console.log(response.choices[0].message);
        console.log(response);
        return(response.choices[0].message);        
    } catch (error) {
        return null;        
    }
}

export const generateTourResponse = async ({city, country}) => {
    const query = `Find a ${city} in this ${country}.
    If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
    Once you have a list, create a one-day tour. Response should be in the following JSON format: 
    {
      "tour": {
        "city": "${city}",
        "country": "${country}",
        "title": "title of the tour",
        "description": "description of the city and tour",
        "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
      }
    }
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

    try {
        const response = await openai.chat.completions.create({
            messages: [
                {role: 'system', content: 'you are a helpful assistant'},
                {role: 'user', content: query},
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0
        })
        console.log(response);
        const tourData = JSON.parse(response.choices[0].message.content);

        if(!tourData.tour) {
            return null;
        }
        return tourData.tour
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getExistingTour = async ({city, country}) => {
    return prisma.tour.findUnique({
        where:{
            city_country: {
                city,
                country
            }
        }
    })
}


export const createNewTour = async (tour) => {   
    return prisma.tour.create({
        data: tour
    })
}

export const getAllTours = async (searchTerm) => {
    //response from server
    if(!searchTerm) {
        const tours = prisma.tour.findMany({
            orderBy: {
                city: 'asc'
            }
        })
        return tours;
    }

    //response from ui
    const tours = prisma.tour.findMany({
        where: {
            OR: [
                {
                    city: {
                        contains: searchTerm,
                    }
                },
                {
                    country: {
                        contains: searchTerm
                    }
                }
            ]
        },
        orderBy: {
            city: 'asc'
        }
    })
    return tours;
}

export const getSingleTour = async (tourId) => {
    return prisma.tour.findUnique({
        where: {
            id: tourId
        }
    })
}

export const generateTourImage = async ({city, country}) => {
    try {
        const tourImg = await openai.images.generate({
            prompt: `a panoramic view of the ${city} ${country}`,
            n: 1,
            size: '512x512'
        })
        return tourImg?.data[0]?.url;
    } catch (error) {
        return null;
    }
}

// export const fetchUserTokensById = async (clerkId) => {
//     const result = await prisma.token.findUnique({
//       where: {
//         clerkId,
//       },
//     });
  
//     return result?.tokens;
//   };
  
//   export const generateUserTokensForId = async (clerkId) => {
//     const result = await prisma.token.create({
//       data: {
//         clerkId,
//       },
//     });
//     return result?.tokens;
//   };
  
//   export const fetchOrGenerateTokens = async (clerkId) => {
//     const result = await fetchUserTokensById(clerkId);
//     if (result) {
//       return result.tokens;
//     }
//     return (await generateUserTokensForId(clerkId)).tokens;
//   };
  
//   export const subtractTokens = async (clerkId, tokens) => {
//     const result = await prisma.token.update({
//       where: {
//         clerkId,
//       },
//       data: {
//         tokens: {
//           decrement: tokens,
//         },
//       },
//     });
//     revalidatePath('/profile');
//     // Return the new token value
//     return result.tokens;
//   };
