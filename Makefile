start:
	npm run dev

back:
	nodemon --exec npx babel-node server/index.js

front:
	npx react-scripts start

install:
	npm install

.PHONY: test