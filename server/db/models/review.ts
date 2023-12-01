import mongoose from 'mongoose'

const { Schema } = mongoose

interface IReview{
    title: string;
    description: string;
    score: number;
    course_id: string;
}

interface ReviewDoc extends mongoose.Document {
    title: string;
    description: string;
    score: number;
    course_id: string;
}

interface ReviewModelInterface extends mongoose.Model<ReviewDoc> {
    build(attr: IReview): ReviewDoc;
}


const reviewSchema = new Schema({
    title: {
        type: String,
        //required: true,
    },
    description: {
        type: String,
        //required: true,
    },
    score: {
        type: Number,
        //required: true,
    },
    course_id: {
        type: String,
        //required: true,
    },
})

reviewSchema.statics.build = (review: IReview) => {
    return new Review(review)
}

const Review = mongoose.model<ReviewDoc, ReviewModelInterface>('Review', reviewSchema)

export { Review }