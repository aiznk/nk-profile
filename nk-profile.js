export class Profile {
	constructor () {
		this.root = document.createElement('div')
		this.root.className = 'nk-profile'
		this._image = null
		this._name = null
		this._texts = []
		this._links = []
		this._width = '300px'
		this.lockAnimateName = false
	}

	set width (width) {
		this._width = width
	}

	get width () {
		return this._width
	}

	set image (image) {
		this._image = image
	}

	get image () {
		return this._image
	}

	set name (name) {
		this._name = name
	}

	get name () {
		return this._name
	}

	set texts (texts) {
		this._texts = texts
	}

	get texts () {
		return this._texts
	}

	set links (links) {
		this._links = links
	}

	get links () {
		return this._links
	}

	clear () {
		while (this.root.childNodes.length) {
			this.root.removeChild(this.root.childNodes[0])
		}
	}

	createImage () {
		let wrapper = document.createElement('div')
		let image = new Image()

		wrapper.className = 'nk-profile__image-wrapper'
		image.className = 'nk-profile__image'

		if (typeof this._image === 'image') {
			image.src = this._image.src
		} else if (typeof this._image === 'string') {
			image.src = this._image
		}

		wrapper.appendChild(image)
		return wrapper
	}

	createName () {
		let wrapper = document.createElement('p')
		let name = document.createElement('span')
		wrapper.className = 'nk-profile__name-wrapper'
		name.className = 'nk-profile__name'
		name.textContent = this._name
		wrapper.appendChild(name)
		return wrapper
	}

	createTexts () {
		let ul = document.createElement('ul')
		ul.className = 'nk-profile__texts'

		for (let text of this._texts) {
			let li = document.createElement('li')
			li.className = 'nk-profile__texts-item'
			li.textContent = text
			ul.appendChild(li)
		}

		return ul
	}

	createLinks () {
		let ul = document.createElement('ul')
		ul.className = 'nk-profile__links'

		for (let link of this._links) {
			let li = document.createElement('li')
			let a = document.createElement('a')

			li.className = 'nk-profile__links-item'
			a.className = 'nk-profile__links-link'

			if (Array.isArray(link) && link.length >= 2) {
				a.textContent = link[0]
				a.href = link[1]
				a.target = '_blank'
			} else if (typeof link === 'string') {
				a.textContent = link
				a.href = link
				a.target = '_blank'
			}
			a.rel = 'noopener noreferrer'

			li.appendChild(a)
			ul.appendChild(li)
		}

		return ul
	}

	createBasicStyleTag () {
		let style = document.createElement('style')	
		style.textContent = `
			:root { 
				--pad-y: calc(1rem*0.6); 
				--pad-x: calc(1.618rem*0.6);
				--width: ${this._width};
				--bg-color: #f7fcfe;
				--bg-color-dark: #ebf6f7;
				--font-color: #302833;
				--font-color-anime: #89c3eb;
				--link-color: #1e50a2;
				--link-color-hover: #d9333f;
				--border-color: #dcdddd;
				--border-radius: 6px;
			}
			.nk-profile * {
				margin: 0;
				padding: 0;
				border-sizing: border-box;
			    font-family:
			        system-ui,
			        -apple-system,
			        BlinkMacSystemFont,
			        "Segoe UI",
			        sans-serif;
			}
			.nk-profile {
				display: inline-block;
				width: var(--width);
				border: 1px solid var(--border-color);
				border-radius: var(--border-radius);
				background: var(--bg-color);
				background: linear-gradient(
					var(--bg-color-dark) 0%, 
					var(--bg-color-dark) 50%, 
					var(--bg-color) 80%
				);
				padding: var(--pad-y) var(--pad-x);
				transition: all 0.6s;
			}
			.nk-profile:hover {
				box-shadow: 0 0 16px #ccc;
			}
			.nk-profile__image-wrapper {
				position: relative;
				text-align: center;
				margin-bottom: var(--pad-y);
			}
			.nk-profile__image {
				position: relative;
				top: 0;
				left: 0;
				width: var(--width);
				height: auto;
				max-width: var(--width);
				max-height: var(--width);
				border-radius: var(--border-radius);
				transition: all 0.3s;
			}
			.nk-profile__image:hover {
				top: 4px;
				left: 4px;
			}
			.nk-profile__name-wrapper {
				text-align: center;
				margin-bottom: var(--pad-y);
			}
			.nk-profile__name {
				color: var(--font-color);
				font-weight: bold;
				font-size: calc(var(--pad-x)*1.4);
				transition: all 0.3s
			}
			.nk-profile__name--anime {
				color: var(--font-color-anime)
			}
			.nk-profile__texts {
				margin-bottom: var(--pad-y);
				list-style: none;
			}
			.nk-profile__texts-item {
				text-indent: 1rem;
				color: var(--font-color);
				margin-bottom: var(--pad-y);
			}
			.nk-profile__links {
				list-style: none;
				text-align: right;
			}
			.nk-profile__links-item {
				margin-bottom: var(--pad-y);
			}
			.nk-profile__links-link {
				color: var(--link-color);
				text-decoration: underline;
				padding-right: 0;
				transition: all .3s;
			}
			.nk-profile__links-link:hover {
				color: var(--link-color-hover);
				text-decoration: none;
				padding-right: 0.2rem;
			}
		`
		return style
	}

	createStyleTag (kind='basic') {
		switch (kind) {
		case 'basic': return this.createBasicStyleTag(); break
		}
	}

	createRoot () {
		this.clear()

		if (this._image) {
			this.root.appendChild(this.createImage())
		}

		if (this._name) {
			this.root.appendChild(this.createName())
		}

		if (this._texts.length) {
			this.root.appendChild(this.createTexts())
		}

		if (this._links.length) {
			this.root.appendChild(this.createLinks())
		}

		this.root.querySelector('.nk-profile__name').addEventListener('mouseover', ev => {
			this.animateName()
		})

		return this.root
	}

	animateName () {
		if (this.lockAnimateName) {
			return
		}

		this.lockAnimateName = true

		let nameElem = this.root.querySelector('.nk-profile__name')
		let orgName = this._name
		let ary = orgName.split('')
		let i = 0
		const lim = 20
		let history = []
		let tmp

		nameElem.classList.add('nk-profile__name--anime')

		const loop = () => {
			let i1 = parseInt(Math.random() * ary.length)
			let i2 = parseInt(Math.random() * ary.length)

			history.push([i1, i2])

			tmp = ary[i1]
			ary[i1] = ary[i2]
			ary[i2] = tmp
			i++

			nameElem.textContent = ary.join('')

			if (i >= lim) {
				requestAnimationFrame(undo)
			} else {
				requestAnimationFrame(loop)
			}
		}

		const undo = () => {
			let [i1, i2] = history.pop()

			tmp = ary[i2]
			ary[i2] = ary[i1]
			ary[i1] = tmp

			nameElem.textContent = ary.join('')

			if (history.length) {
				requestAnimationFrame(undo)
			} else {
				nameElem.textContent = orgName
				nameElem.classList.remove('nk-profile__name--anime')
				this.lockAnimateName = false
			}
		}

		requestAnimationFrame(loop)
	}
}
