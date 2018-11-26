module.exports = (app) => {
  app
    .use('/api/foo', (req, res) => res.json({
      title: 'Example data fetching from /api/foo',
      description: 'Lorem ipsum dolor sit amet, <strong>consectetur adipiscing</strong> elit. In tincidunt arcu non tristique dignissim. Aenean et nunc varius, vulputate sem ac, sollicitudin mauris. Vestibulum pulvinar maximus consectetur. Quisque non turpis id sapien efficitur semper. Suspendisse euismod malesuada libero, vel vulputate libero bibendum nec. Cras semper quis ipsum vel malesuada. Donec condimentum porttitor pulvinar. Ut ut neque vehicula, iaculis eros at, ultrices ipsum. Pellentesque egestas eros tincidunt, mattis elit et, bibendum diam. Aliquam vel turpis ac magna imperdiet efficitur eget nec lacus. Duis sed libero ac nulla scelerisque pretium eget vitae mi. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
    }))
    .use('/api/bar', (req, res) => res.json({
      title: 'Example data fetching from /api/bar',
      items: [
        'Lorem ipsum dolor sit amet',
        'Consectetur adipiscing',
        'Interdum et malesuada fames',
      ],
    }));
  return app;
};
