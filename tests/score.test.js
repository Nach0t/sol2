describe('🧟‍♂️ Puntaje por zombies eliminados', () => {
  test('Sumar puntos por zombie eliminado', () => {
    const zombiesEliminados = 3;
    const puntosPorZombie = 10;
    const score = zombiesEliminados * puntosPorZombie;
    expect(score).toBe(30);
  });
});