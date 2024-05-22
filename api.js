import SanityClient, { uploadImage } from './sanity';

let sanityQuery = (query, params) => SanityClient.fetch(query, params);

export const getFeaturedShops = () => {
  return sanityQuery(`
    *[_type=='featured']{
      ...,
      shops[]->{
        ...,
        products[]->{
          ...
        },
        type->{
          name
        }
      }
    }
  `);
};

export const getCategories = () => {
  return sanityQuery(`
    *[_type == 'category']
  `);
};

export const getFeaturedShopById = (id) => {
  return sanityQuery(`
    *[_type == 'featured' && _id == $id] {
      ...,
      shops[]->{
        ...,
        products[]->,
        type->{
          name
        }
      }
    }[0]
  `, { id });
};

export const getShopsByCategory = async (categoryId) => {
  const query = `
    *[_type == 'shop' && type._ref == $categoryId] {
      _id,
      name,
      image,
      description,
      address,
      lng,
      lat,
      rating,
      reviews,
      type,
      products[]->
    }
  `;
  
  const params = { categoryId };
  
  try {
    const response = await sanityQuery(query, params);
    return response;
  } catch (error) {
    console.error('Error fetching shops by category:', error);
    return [];
  }
};


