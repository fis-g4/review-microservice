import express, {Request, Response} from 'express';
import { Review } from '../db/models/review';

const router = express.Router()
//Ruta para obtener todas las reviews
router.get('/', async (req: Request, res: Response) => {
    try {
      const reviews = await Review.find({});
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener las reseñas.' });
    }
  });
// Ruta para obtener detalles de una reseña por ID (GET /reviews/{id})
router.get('/:id', async (req: Request, res: Response) => {
    try {
      const review = await Review.findById(req.params.id);
  
      if (!review) {
        return res.status(404).json({ error: 'Reseña no encontrada.' });
      }
  
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener la reseña.' });
    }
  });
  
// Ruta para obtener todas las reseñas asociadas a un curso por ID (GET /reviews/by-course/{course_id})
router.get('/course/:course_id', async (req: Request, res: Response) => {
try {
    const reviews = await Review.find({ course_id: req.params.course_id });

    if (reviews.length === 0) {
    return res.status(404).json({ error: 'No hay reseñas asociadas a este curso.' });
    }

    return res.status(200).json(reviews);
} catch (error) {
    return res.status(500).json({ error: 'Error al obtener las reseñas del curso.' });
}
});  

// Ruta para obtener la puntuación media de todas las reseñas asociadas a un curso por ID (GET /reviews/average-score/{course_id})
router.get('/average-score/:course_id', async (req: Request, res: Response) => {
    try {
      const averageScore = await Review.aggregate([
        { $match: { course_id: req.params.course_id } }, // Filtra por course_id
        { $group: { _id: null, averageScore: { $avg: '$score' } } },
      ]);
  
      if (averageScore.length === 0) {
        return res.status(404).json({ error: 'No hay reseñas para calcular el promedio.' });
      }
  
      return res.status(200).json({ averageScore: averageScore[0].averageScore });
    } catch (error) {
      return res.status(500).json({ error: 'Error al calcular el promedio de puntuación.' });
    }
});

// Ruta para crear una nueva reseña y asociarla a un curso (POST /reviews)
router.post('/', async (req: Request, res: Response) => {
    try {
      const { title, description, score, course_id } = req.body;
  
      // Verifica que el course_id proporcionado exista o realiza las validaciones necesarias
  
      const newReview = new Review({ title, description, score, course_id });
      const savedReview = await newReview.save();
  
      return res.status(201).json(savedReview);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la reseña.' });
    }
  });

// Ruta para actualizar una reseña y, opcionalmente, cambiar el curso asociado (PUT /reviews/{id})
router.put('/:id', async (req: Request, res: Response) => {
    try {
      const { title, description, score, course_id } = req.body;
      
      // Verifica que el course_id proporcionado exista o realiza las validaciones necesarias
  
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { title, description, score, course_id },
        { new: true }
      );
  
      if (!updatedReview) {
        return res.status(404).json({ error: 'Reseña no encontrada.' });
      }
  
      return res.status(200).json(updatedReview);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la reseña.' });
    }
  });
/*
router.post('/login', async (req: Request, res: Response) => {
    const { email, password }: FormInputs = req.body

    const user = await Review.findOne({email, password});

    if (!user) {
        return res.status(404).send('User Not Found!')
    }

    return res.status(200).json(user)
})
router.post('/', async (req: Request, res: Response) => {
  const { email, password }: FormInputs = req.body

  let name = "Test User";

  const user = Review.build({
    name: name, 
    email: email, 
    password: password});

  await user.save();

  return res.status(201).json(user)
})*/

export default router
