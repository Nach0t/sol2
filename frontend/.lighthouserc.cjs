module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173/'],
      startServerCommand: 'npm run preview',
      numberOfRuns: 3
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
