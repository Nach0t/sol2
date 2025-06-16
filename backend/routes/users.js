var express = require('express');
var router = express.Router();

// Umbrales de puntuación para cada categoría
const rankingThresholds = {
  "Don Pollo": 120,
  Evie: 80,
  "Ruby-Chan": 50,
  Frances: 0
};

/**
 * Calcula la categoría en función de la puntuación.
 *
 * @param {number} score - Valor numérico de la puntuación.
 * @returns {string}
 */
function getRank(score) {
  if (typeof score !== 'number' || isNaN(score)) {
    throw new TypeError('El parámetro score debe ser un número válido');
  }

  if (score >= rankingThresholds.Evie) return 'Evie';
  if (score >= rankingThresholds['dark-Vader']) return 'dark-Vader';
  return 'Frances';
}

/**
 * GET /ranking?score=<número>
 * Devuelve un JSON con el ranking calculado.
 */
router.get('/', function(req, res, next) {
  const raw = req.query.score;
  const score = Number(raw);
  if (!raw || isNaN(score)) {
    return res.status(400).json({ error: 'Parámetro "score" inválido o ausente. Debe ser un número.' });
  }

  try {
    const rank = getRank(score);
    res.json({ score, rank });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
