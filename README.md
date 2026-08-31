# nk-profile

Create the profile element with parameters.

## Example

![basic-style](./res/basic-style.gif)

```js
import { Profile } from '../nk-profile.js'

let prof = new Profile()

prof.width = '300px'
prof.image = './women.png'
prof.name = 'Tanaka Mari'
prof.texts.push('Hi, I am Tanaka Mari. My hobby is programming.')
prof.texts.push('Please be friends.')
prof.links.push('https://example.com')
prof.links.push(['Example', 'https://example.com'])
prof.links.push(['postmaster@example.com', 'mailto:postmaster@example.com'])

document.head.appendChild(prof.createStyleTag())
document.body.appendChild(prof.createRoot())
```

## License

MIT
