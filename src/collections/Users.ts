import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
<<<<<<< HEAD
=======
    // Email added by default
    // Add more fields as needed
>>>>>>> 08_Authentication
    {
      name:"username",
      required:true,
      unique:true,
      type:"text"
<<<<<<< HEAD
=======

>>>>>>> 08_Authentication
    }
  ],
};

