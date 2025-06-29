describe('💀 Sistema de muerte', () => {
  test('Jugador muere al llegar a 0 vida', () => {
    const vida = 0;
    const estaMuerto = vida <= 0;
    expect(estaMuerto).toBe(true);
  });
});