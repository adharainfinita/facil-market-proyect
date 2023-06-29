import  { Request, Response } from 'express';
import Review from '../../models/Review';

const deleteReviewHandler = async (req: Request, res: Response) => {
    const { reviewId } = req.body;
  
    try {
      // Verificar si el review existe antes de eliminarlo
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review no encontrado' });
      }
  
      // Eliminar el review
      await review.destroy();
  
      res.json({ message: 'Review eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el review:', error);
      res.status(500).json({ message: 'Error al eliminar el review' });
    }
  };

  export default deleteReviewHandler