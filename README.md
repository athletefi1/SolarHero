# SolarMan Energy Website

A dynamic, interactive website for a residential solar energy company with a superhero theme. SolarMan helps homeowners in New Jersey and Pennsylvania calculate their long-term energy savings and sign up for fixed-rate solar plans with no upfront costs.

## Features

- **Interactive Calculator**: Calculate potential energy savings over 25 years
- **Flip Card Animations**: Interactive elements that engage users
- **Referral Program**: Details on customer referral benefits
- **Mobile-Responsive Design**: Fully functional on all device sizes
- **Social Media Sharing**: Share your solar savings with friends

## GitHub Pages Setup

This website is configured for GitHub Pages deployment:

1. Ensure `index.html` is at the root level of your repository
2. The `CNAME` file is set up for the custom domain (sunman.energy)
3. All asset paths use relative references to prevent loading issues

## Deployment Instructions

1. Push these files to your GitHub repository
2. In your repository's Settings → Pages:
   - Select the branch containing these files (usually `main`)
   - Ensure custom domain is set to `sunman.energy`
3. For your Namecheap DNS, ensure these A records point to GitHub Pages:
   - A record: @ → 185.199.108.153
   - A record: @ → 185.199.109.153
   - A record: @ → 185.199.110.153
   - A record: @ → 185.199.111.153
   - CNAME record: www → yourusername.github.io

## Local Development

1. Clone the repository
2. Open index.html in your browser to view the site locally

## License

[MIT License](LICENSE)

## Contact

For more information, contact info@sunman.energy