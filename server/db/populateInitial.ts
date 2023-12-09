import { IUser, User } from './models/user';
import { Review } from './models/review';
import { Material } from './models/material';
import { Course } from './models/course';
async function createConsts() {
    const authorId1 = 'maria'
    const authorId2 = 'juan'
    const authorId3 = 'pepe'

    const maria = User.build({
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123',
    }).save();

    const juan = User.build({
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123',
    }).save();

    const userWithoutReview = User.build({
        name: 'Profesor Xavier',
        email: 'xavier@example.com',
        password: 'xav',
    }).save();

    const material = Material.build({
        title: 'Ejercicios de Python',
        description: 'Ejercicios para practicar Python básico',
        price: 0,
        currency: 'EUR',
        author: "David",
        purchasers: [],
        file: 'fileId',
        type: 'book',
    }).save();

    const david = User.build({
        name: 'David Barragan',
        email: 'david@example.com',
        password: 'david',
    });

    const davidSaved = await david.save();

    const newCourse = Course.build({
        name: 'How to make Microservices',
        description: 'Learn how to make Microservices using MongoDB, Node.js, Express and React!',
        price: 30,
        creator: davidSaved._id,
    });

    await newCourse.save();

    // Utiliza Promise.all para esperar a que todas las promesas se resuelvan
    await Promise.all([maria, juan, userWithoutReview, material]);
}

function populateReviews() {
    
}
async function populateDB() {

    console.log('Populating DB...');
    
    if (process.env.NODE_ENV !== 'production') { 

        Review.collection.countDocuments().then((count) => {
            if (count === 0) {
                createConsts()
            }
        })
    }

    console.log('Populated!');
}

export default populateDB;