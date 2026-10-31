# The Carnival — Group 10

A dependency-free, cinematic static website for Wadi El-Nile Scouts & Guides Group 10. It can be hosted on GitHub Pages or any static host.

## Run locally

Open `index.html` directly for a quick preview, or use VS Code's Live Server extension. No build step or package installation is required.

## Configure the event

All editable event details and asset paths live in [`config.js`](./config.js):

- Set `eventDate` as `YYYY-MM-DD` and `eventStartTime` as `HH:MM` to enable the countdown, then set `enableCountdown: true`.
- Add the venue, address, ticket price, contact email, and final tagline.
- Paste the real Google Forms respondent URL into `ticketFormUrl`.
- Replace the suggested files in `assets/images/` and `assets/videos/` without changing the configuration paths, or update the paths in `config.js`.
- Set `enableParticles`, `enableCustomCursor`, or `enableSound` as desired. Sound is intentionally not implemented until a real, user-enabled audio asset is supplied.

Missing optional images and the trailer are detected and replaced by designed fallbacks. The supplied mascot is at `assets/images/xman-new.png`. The carnival artwork is used as a transparent decorative illustration; the supplied invitation/ticket is not displayed.

The current event details are configured as Friday, November 20, 2026, 12:00 PM–9:00 PM at Collège Patriarcal (ex: Frères). Update them in `config.js` if organizers make changes.

## HOW TO CONNECT THE TICKET BOOKING FORM

1. Create or open the Google Form and configure its questions and submission settings.
2. Copy the form's public respondent link.
3. Open `config.js` and paste it into `ticketFormUrl`.
4. Save the file and test every booking button locally.
5. Test the published button in Safari on iPhone and Chrome on Android.

The site opens the form in a new tab. It does not collect card details or claim to verify payment; organizers should verify payment and confirm bookings through their chosen process.

## Free deployment with GitHub Pages

1. Open this folder in VS Code and check it in a browser.
2. Create a GitHub repository and upload the project files, including the `assets` folder.
3. In the repository, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose the main branch and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the default repository URL.
6. Test the public URL, especially the booking form and mobile layout.
7. To update the site, edit the files, upload/commit the changes, and wait for Pages to redeploy.

All paths are relative so the site also works when published under a repository subpath. No API keys, backend, paid service, or database are required.
