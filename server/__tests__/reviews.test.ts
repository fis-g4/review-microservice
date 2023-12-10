import dotenv from "dotenv";
import request from 'supertest';
import { Review } from '../db/models/review'
import { describe } from "node:test";

const BASE_URL = "http://localhost:8000/";

dotenv.config();


const TEST_URLS = {
    reviews: 'api/v1/reviews',
    newReview: 'api/v1/reviews/new',
    reviewById: 'api/v1/reviews/:id',
    deleteReview: 'api/v1/reviews/remove',
    reviewsByCourse: 'api/v1/reviews/courses/:id',
    reviewsByUser: 'api/v1/reviews/users/:id'
}

const TEST_USER = {
    name: 'Maria Doe',
    email: 'maria@example.com',
    password: 'maria123',
}
const TEST_COURSE = {
    name: "Curso sobre como hacer tests.",
    description: "Introducción sobre como hacer tests - FIS",
    price: 100,
    creator: TEST_USER,
}

const TEST_MATERIAL = {
    title: "Transparencias sobre testing en microservicios",
    description: "Transparencias sobre como hacer testing en microservicios - FIS",
    price: 100,
    currency: 'USD',
    author: "David",
    purchasers: [],
    file: "string",
    type: 'book'
}

const TEST_REVIEW_COURSE = {
    title: "Muy buena profesora",
    description: "Me ha gustado mucho",
    score: 5,
    course: null,
    creator: null,
    material: null,
}

const TEST_REVIEW_USER = {
    title: "Muy buena profesora",
    description: "Me ha gustado mucho",
    score: 5,
    course: null,
    creator: null,
    material: null,
}

const TEST_REVIEW_MATERIAL  = {
    title: "Muy buen material sobre testing",
    description: "Me ha gustado mucho",
    score: 5,
    course: null,
    creator: null,
    material: null,
}

//Test 1 - Obtener todas las reviews


describe(`GET ${TEST_URLS.reviews}`, () => {
  it('Obtiene todas las reseñas: 200 OK', async () => {
    try {
        const response = await request(BASE_URL).get(TEST_URLS.reviews);
        console.log("Se obtienen todas las reseñas: "+response.body); // Muestra la respuesta completa del servidor en la consola
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    } catch (error) {
      console.error(error);
      throw error; // Re-lanza el error para que Jest lo capture
    }
  });
});

//Test 2 - Obtener una review por su id

describe(`GET ${TEST_URLS.reviewById}`, () => {
    let reviewId: string;

    // Antes de todas las pruebas, crea una revisión de ejemplo y guarda su ID
    beforeAll(async () => {
        const exampleReview = Review.build(TEST_REVIEW_COURSE);
        console.log("Review de ejemplo: " + exampleReview);
    
        try {
            const savedReview = await exampleReview.save();
            console.log("Review salvada: " + savedReview);
            reviewId = savedReview._id;
        } catch (error) {
            console.error(error);
        }
    }, 10000);

    // Después de todas las pruebas, elimina la revisión de ejemplo (o realiza limpieza)
    afterAll(async () => {
        await Review.findByIdAndDelete(reviewId);
    },10000);

    it('debería obtener una revisión por su ID', async () => {
        // Realiza una solicitud GET para obtener la revisión por su ID
        const response = await request(BASE_URL).get(TEST_URLS.reviewById.replace(':id', reviewId));
        console.log(response.body);
        // Verifica que la respuesta sea exitosa (código de estado 200)
        expect(response.status).toBe(200);

        // Verifica que el cuerpo de la respuesta contenga la revisión
        expect(response.body).toHaveProperty('_id', reviewId);

    });

    it('debería devolver 500 si la revisión no se encuentra', async () => {
        // Proporciona un ID que no existe para obtener una revisión
        const nonExistentReviewId = '5f18b6a38d03c92d54833333'; // ID no existente

        // Realiza una solicitud GET para obtener la revisión por un ID no existente
        const response = await request(BASE_URL).get(TEST_URLS.reviewById.replace(':id', nonExistentReviewId));

        // Verifica que la respuesta sea 404 si la revisión no se encuentra
        expect(response.status).toBe(500);
        // Puedes verificar el mensaje de error u otros detalles según tu implementación
    });
});