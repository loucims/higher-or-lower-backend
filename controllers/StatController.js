import {Stat, User} from "../Models/index.js";
import {validateToken } from "../utils/tokens.js";


class StatController{


updateRecordNormal = async (req, res) => {
    
    const { recordNormal } = req.body;
    const userId = req.user.id;
  
    try {
      const stats = await Stats.findOne({ where: { userId } });
  
      if (!stats) {
        return res.status(404).json({ error: 'Estadísticas no encontradas' });
      }
  
      if (recordNormal > stats.recordNormal) {
        await Stats.update({recordNormal},{where: {userId}});
        return res.json({ message: 'Record normal actualizado', stats });
      }
  
      res.json({ message: 'El nuevo record normal no es mayor al actual', stats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el record normal' });
    }
  };
  

updateRecordTimer = async (req, res) => {
    const { recordTimer } = req.body;
    const userId = req.user.id;
  
    try {
      const stats = await Stats.findOne({where: {userId}});
  
      if (!stats) {
        return res.status(404).json({ error: 'Estadísticas no encontradas' });
      }
  
      if (recordTimer > stats.recordTimer) {
        await Stats.update({recordTimer},{ where: {userId}});
        return res.json({ message: 'Record timer actualizado', recordTimer });
      }
  
      res.json({ message: 'El nuevo record timer no es mayor al actual', recordTimer: stats.recordTimer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el record timer' });
    }
  };


updateTotalGuesses = async (req, res) => {
    const { additionalGuesses } = req.body;
    const userId = req.user.id;
  
    try {
      const stats = await Stats.findOne({ where: { userId } });
  
      if (!stats) {
        return res.status(404).json({ error: 'Estadísticas no encontradas' });
      }
  
      const newTotalGuesses = stats.totalGuesses + additionalGuesses;
      await Stats.update({totalGuesses: newTotalGuesses},{where: {userId}});
  
      res.json({ message: 'Total de adivinanzas actualizado', totalGuesses: newTotalGuesses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el total de adivinanzas' });
    }
  };
  


}

export default StatController;