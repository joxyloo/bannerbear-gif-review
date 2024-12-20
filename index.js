const { Bannerbear } = require('bannerbear');
const bb = new Bannerbear('your_api_key');
const reviewer = {
  name: 'anonymous',
  profile_photo: 'https://cdn.bannerbear.com/sample_images/welcome_bear_photo.jpg',
  review: 'Best shawarma in town!',
  review_body:
    'Tender, flavorful meat wrapped in a soft pita, paired with fresh veggies and tangy pickles. Every bite is a perfect blend of spices and textures—definitely a must-try!',
  review_date: '10 Dec 24',
  review_rating: 90,
  uploaded_images: [
    'https://images.pexels.com/photos/15339516/pexels-photo-15339516/free-photo-of-man-cutting-kebab.jpeg',
    'https://images.pexels.com/photos/5779413/pexels-photo-5779413.jpeg',
    'https://images.pexels.com/photos/5779371/pexels-photo-5779371.jpeg'
  ],
};
(async () => {
  const bg = reviewer.uploaded_images[Math.floor(Math.random() * reviewer.uploaded_images.length)];
  const frames = reviewer.uploaded_images.map((image) => [
    { name: 'background_image', image_url: bg },
    { name: 'reviewheader', text: reviewer.review },
    { name: 'reviewerphoto', image_url: reviewer.profile_photo },
    { name: 'reviewer', text: reviewer.name },
    { name: 'date', text: reviewer.review_date },
    { name: 'star_rating', rating: reviewer.review_rating },
    { name: 'review_imagecontainer', image_url: image },
    { name: 'reviewbody', text: reviewer.review_body },
  ]);
  const images = await bb.create_animated_gif('your_template_uid', {
    frames: frames,
    fps: 1
  });

  let gif = await bb.get_animated_gif(images.uid);
  while (gif.status !== 'completed') {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before checking again
    gif = await bb.get_animated_gif(images.uid);
  }
  console.log(gif.image_url);
  //https://images.bannerbear.com/animated_gifs/compileds/000/089/935/original/wgPaGBp7nm0zenyzJ0.gif?1734659178
})();
