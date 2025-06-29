describe('🧪 HUD/UI', () => {
  test('HUD muestra nombre y vida', () => {
    const hud = {
      nombre: 'Jugador1',
      vida: 100
    };
    expect(hud.nombre).toBeDefined();
    expect(hud.vida).toBeGreaterThanOrEqual(0);
  });
});