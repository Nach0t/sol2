module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run preview',
        url: ['http://localhost:5173/'],
        numberOfRuns: 3
      },
      assert: {
        preset: 'lighthouse:recommended'
      },
      upload: {
        target: 'temporary-public-storage'
      }
    }
  };
  