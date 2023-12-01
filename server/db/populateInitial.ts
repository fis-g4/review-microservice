import { User } from './models/user';
import { Review } from './models/review';
function populateUsers() {
    User.build({
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123',
    }).save();
    
    User.build({
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123',
    }).save();
}
function populateReviews() {
    Review.build({
        title: 'Maria Doe',
        description: 'maria@example.com',
        score: 1,
        course_id: "0000f",
    }).save();
    
    Review.build({
        title: 'Francisco Doe',
        description: 'maria@example.com',
        score: 3,
        course_id: "1111g",
    }).save();
}
async function populateDB() {

    console.log('Populating DB...');
    
    if (process.env.NODE_ENV !== 'production') { 

        User.collection.countDocuments().then((count) => {
            if (count === 0) {
                populateUsers()
            }
        })
        Review.collection.countDocuments().then((count) => {
            if (count === 0) {
                populateReviews()
            }
        })
    }

    console.log('Populated!');
}

export default populateDB;